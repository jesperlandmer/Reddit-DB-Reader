# node-mysql-vagrant
This is a boilerplate vagrant solution.

Following deployments will be installed:
* node.js, latest stable (OBS not LTS) version
* npm (along with node.js)
* MySQL-server

You can test out your environment by ssh'ing into your environment and running the sample script:

    $ vagrant ssh
    $ node app.js

## Important note about starting Vagrant

There are issues installing MySQL on the Vagrant machine on start. If that happens, do the following:

    $ chmod +x config/vagrant
    $ config/vagrant

This vagrant machine is tested on Mac OSX Sierra with Virtual Box version 5.0.10 and Vagrant version 1.7.4

# production

This application was put on the virtual server provided from https://www.digitalocean.com/

## ssh-ing to success

When you want to spin up your virtual server, use an SSH key to gain access to the server. 
It's faster and more secure than gaining access through for ex. your email.

To set up your SSH-key, simply follow:

Create the key in the root terminal:

    ssh-keygen -t rsa

Once you've entered the command, you'll get a few questions. Answer these or don't.
Your public key should now be accessible in /demo/.ssh/id_rsa.pub.
Read the key by doing following command:

    cat ~/.ssh/id_rsa.pub

Copy this key, and save it to whatever virtual server you're using. 

## Environmental variables

Setting environment variables is easy. locate yourself to ~/.bashrc, and add your variables

    nano ~/.bashrc

## Jumping in to your server

Once your server is set up, and you've got your ip-address for the virtual server, 
it's time to connect to it.

In the terminal, do the following command:

    ssh root@[your.ip.address.here]

Since your machine and the virtual server shares the same key pair, there will be no 
need to enter a password to access the root.

Always check if the versions of the MEAN are up to date. An npm-module is installed called "n", which 
will very easily update your node-server. Also check if your Mongo is installed and up to date.

## Setting up your server - Git push

When you've successfully accessed your server, go to the root directory. Check if you're 
in the root by typing following command:

    -ls

There should be a number of directories, including one named "var". Locate yourself to /var, 
and create a new directory called "repo". 

    mkdir repo && cd repo

Once in the /repo-directory, set up a new repository:

    mkdir site.git && cd site.git
    git init --bare

In your new repository, you will se a number of files and folders. Locate yourself to the "hooks"-folder:

    cd hooks

Now create the file "post-receive". This server-hook will be executed once a "push" is completely 
finished. 

    touch post-receive

We'll need to add som script to the server hook, so go into the text editor nano:

    nano post-receive

From there, add the following script:

    #!/bin/sh
    git --work-tree=/var/www/[name.of.application.or.domain] --git-dir=/var/repo/site.git checkout -f

Make sure to keep in mind the name of the application and/or the domain that you've used.

When you've finished typing, save the hook by pressing "ctrl-x". When it asks you to save 
the server, choose "yes", and then press "enter".

In order to able to execute the hook, we need to set up the proper permission by using:

    chmod +x post-receive

And there, your repository is now set, and you are able to receive push-commands from git!

## Setting up your server - Local Machine

Locate yourself back to the "/var"-directory. Create a new directory called "www":

    mkdir www && cd www

Add a new directory where you'll store the app and receive the pushed data from your created 
repository(var/repo/site.git). The directory must have the same name as the name you specified in 
the hook "post-receive".

    mkdir [name.of.application.or.domain] && cd [name.of.application.or.domain]

## Pushing to your virtual server repository

Open a new terminal-window and locate yourself to the directory of your application. From 
there, you will add a new remote called "production". Set the following command for the remote:

    git remote add production ssh://root@[your.ip.address.here]/var/repo/site.git
    git push production

If everything worked out fine with no errors, it's time to fire up your application in the virtual server. 
Locate yourself back to "/var/www/[name.of.application.or.domain]" and check if the files are there 
by typing "-ls"
 
If all your application-files are found in the directory, you could try out your application. Do 
"node app.js" and locate yourself to "http://[your.ip.address]:port". 

## Setting up reverse proxy Nginx

From Wikipedia(https://en.wikipedia.org/wiki/Nginx):

Nginx, is a web server, which can also be used as a reverse proxy, load balancer and HTTP cache.
Created by Igor Sysoev in 2002, it runs on Unix, Linux, BSD variants, macOS, Solaris, AIX, HP-UX, and Windows.
Nginx is free and open source software, released under the terms of a BSD-like license. A company of the same name was founded in 2011 to provide support.

Nginx will help us to set up our reversed proxy which will return an encrypted request to our web-server(SSL). 
It will also compress and handle our static-files in a better way than setting up middleware in express.js.

To install the latest version of nginx, you'll first need to update your repositories. Locate yourself to 
your application-directory in your virtual server.
The command gets information of the newest versions of packages and dependencies of your repository:

    apt-get update
    
From there, install nginx:

    apt-get install nginx

After a few seconds, nginx should be installed!

## Nginx installation

Locate yourself back to your root directory in your virtual server. Go to:

    cd /etc/nginx/sites-available
    -ls
    
There should be a file there called "default". Open the file in the nano text editor

    nano default
    
There will be a ton of text in this file. Delete it ALL. Using "ctrl-k" could speed up the process.
Assuming you've got a SSL-certificate, add the following to the default-file:

    server {
            listen [some.port];
            ssl on;
            ssl_certificate /var/www/[name.of.the.app.or.server]/[your.cert];
            ssl_certificate_key /var/www/[name.of.the.app.or.server]/[your.key];
            server_name localhost;
    
            gzip on;
            gzip_comp_level 6;
            gzip_vary on;
            gzip_min_length  1000;
            gzip_proxied any;
            gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;
            gzip_buffers 16 8k;
    
            location ~ ^/(images/|img/|javascript/|js/|css/|stylesheets/|flash/|med$
                    root /var/www/[name.of.the.app.or.server]/[static.files];
                    access_log off;
                    expires max;
    }
    
            location / {
                    proxy_pass http://localhost:[port];
                    proxy_http_version 1.1;
                    proxy_set_header Upgrade $http_upgrade;
                    proxy_set_header Connection 'upgrade';
                    proxy_set_header Host $host;
                    proxy_cache_bypass $http_upgrade;
            }

Replace the brackets with your own directories and files. This will setup the SSL-encryption to your server. 
First you'll need to specify a reference to your certificate and key:

            listen [some.port];
            ssl on;
            ssl_certificate /var/www/[name.of.the.app.or.server]/[your.cert];
            ssl_certificate_key /var/www/[name.of.the.app.or.server]/[your.key];
            server_name localhost;
            
GZip will compress your data and reduce your bandwidth-costs. The gzip-types is the types of files that 
will be compressed. No need to include text/html, since it's included by default.

            gzip on;
            gzip_comp_level 6;
            gzip_vary on;
            gzip_min_length  1000;
            gzip_proxied any;
            gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;
            gzip_buffers 16 8k;

In this snippet, I've also set the location for the static-files, so no need to set the static files 
in your application:

            location ~ ^/(images/|img/|javascript/|js/|css/|stylesheets/|flash/|med$
                    root /var/www/[name.of.the.app.or.server]/[static.files];
                    access_log off;
                    expires max;

The second location specifies your localhost, and "upgrades" the http-protocol to SSL. The reversed proxy will 
request your server in a SSL.
You are free to set any location. In this example, I've set the location to "/":

            location / {
                    proxy_pass http://localhost:[port];
                    proxy_http_version 1.1;
                    proxy_set_header Upgrade $http_upgrade;
                    proxy_set_header Connection 'upgrade';
                    proxy_set_header Host $host;
                    proxy_cache_bypass $http_upgrade;
            }

## Your server is set

Your web server should now be set. Locate yourself back to your application folder on the virtual server 
(/var/www/[name.of.the.app.or.server]) and fire up the application. You should be able to visit your IP-address 
under SSL-protected protocols.

### Pro tip

If you need a process manager, I would recommend installing PM2. It's easy to manage, and runs the applications 
in the background. It's also useful for restarting your server if a crash would occur:

    sudo npm install -g pm2

This application is started with 

        npm start
        
If you want to stop the application, simply run:

        pm2 stop app