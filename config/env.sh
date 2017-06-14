#!/usr/bin/env bash

echo "export NODE_ENV='production'" >> /home/vagrant/.bashrc
echo "export COOKIE_NAME='mendr_cookie'" >> /home/vagrant/.bashrc
echo "export COOKIE_SECRET='1DVasdD3234KfsdfSkdladf'" >> /home/vagrant/.bashrc
echo "export DB_USERNAME='mendr_admin'" >> /home/vagrant/.bashrc
echo "export DB_PASSWORD='g1n87-3SWat-46w24-638T0-s5682'" >> /home/vagrant/.bashrc
echo "export FACEBOOK_CLIENT_ID='1430201070363320'" >> /home/vagrant/.bashrc
echo "export FACEBOOK_CLIENT_SECRET='c5bac2bad922b8d8683b4b747649105b'" >> /home/vagrant/.bashrc
echo "export FACEBOOK_CLIENT_URL='https://08e951ef.ngrok.io/auth/facebook/callback'" >> /home/vagrant/.bashrc
echo "export GOOGLE_API='AIzaSyDC9xs_DNHv_Z7T7T43zc65zpOVPzgHlAs'" >> /home/vagrant/.bashrc
echo "export MAPQUEST_API='kF3GpLE5R64XyfWXI6qMWhNUmbrGK4EA'" >> /home/vagrant/.bashrc
echo "export USERS_DATABASE='users'" >> /home/vagrant/.bashrc
echo "export USERS_TABLE='user'" >> /home/vagrant/.bashrc
echo "export EVENTS_TABLE='activities'" >> /home/vagrant/.bashrc
echo "export CHAT_TABLE='chat'" >> /home/vagrant/.bashrc
echo "export MESSAGE_TABLE='message'" >> /home/vagrant/.bashrc
echo "export TAG_TABLE='tags'" >> /home/vagrant/.bashrc

export NODE_ENV='production'
export COOKIE_NAME='mendr_cookie'
export COOKIE_SECRET='1DVasdD3234KfsdfSkdladf'
export DB_USERNAME='mendr_admin'
export DB_PASSWORD='g1n87-3SWat-46w24-638T0-s5682'
export FACEBOOK_CLIENT_ID='1430201070363320'
export FACEBOOK_CLIENT_SECRET='c5bac2bad922b8d8683b4b747649105b'
export FACEBOOK_CLIENT_URL='https://138.68.95.202/auth/facebook/callback'
export GOOGLE_API='AIzaSyDC9xs_DNHv_Z7T7T43zc65zpOVPzgHlAs'
export MAPQUEST_API='kF3GpLE5R64XyfWXI6qMWhNUmbrGK4EA'
export USERS_DATABASE='users'
export USERS_TABLE='user'
export EVENTS_TABLE='activities'
export CHAT_TABLE='chat'
export MESSAGE_TABLE='message'
export TAG_TABLE='tags'

        NODE_ENV: 'development'

        "NODE_ENV": 'production',
        "COOKIE_NAME": 'mendr_cookie',
        "COOKIE_SECRET": '1DVasdD3234KfsdfSkdladf',
        "DB_USERNAME": 'mendr_admin',
        "DB_PASSWORD": 'g1n87-3SWat-46w24-638T0-s5682',
        "FACEBOOK_CLIENT_ID": '1430201070363320',
        "FACEBOOK_CLIENT_SECRET": 'c5bac2bad922b8d8683b4b747649105b',
        "FACEBOOK_CLIENT_URL": 'https://138.68.95.202/auth/facebook/callback',
        "GOOGLE_API": 'AIzaSyDC9xs_DNHv_Z7T7T43zc65zpOVPzgHlAs',
        "MAPQUEST_API": 'kF3GpLE5R64XyfWXI6qMWhNUmbrGK4EA',
        "USERS_DATABASE": 'mendrApp',
        "USERS_TABLE": 'user',
        "EVENTS_TABLE": 'activities',
        "CHAT_TABLE": 'chat',
        "MESSAGE_TABLE": 'message',
        "TAG_TABLE": 'tags'

        {
  "apps" : [{
    "name"        : "app",
    "script"      : "./app.js",
    "watch"       : true,
    "env": {
      "NODE_ENV": "development"
    },
    "env_production" : {
        "NODE_ENV": "production",
        "COOKIE_NAME": "mendr_cookie",
        "COOKIE_SECRET": "1DVasdD3234KfsdfSkdladf",
        "DB_USERNAME": "mendr_admin",
        "DB_PASSWORD": "g1n87-3SWat-46w24-638T0-s5682",
        "FACEBOOK_CLIENT_ID": "1430201070363320",
        "FACEBOOK_CLIENT_SECRET": "c5bac2bad922b8d8683b4b747649105b",
        "FACEBOOK_CLIENT_URL": "https://138.68.95.202/auth/facebook/callback",
        "GOOGLE_API": "AIzaSyDC9xs_DNHv_Z7T7T43zc65zpOVPzgHlAs",
        "MAPQUEST_API": "kF3GpLE5R64XyfWXI6qMWhNUmbrGK4EA",
        "USERS_DATABASE": "mendrApp",
        "USERS_TABLE": "user",
        "EVENTS_TABLE": "activities",
        "CHAT_TABLE": "chat",
        "MESSAGE_TABLE": "message",
        "TAG_TABLE": "tags"
    }
  },{
    "name"       : "api-app",
    "script"     : "./api.js",
    "instances"  : 4,
    "exec_mode"  : "cluster"
  }]
}
