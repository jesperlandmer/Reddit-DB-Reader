## MySQL-server installation (https://serversforhackers.com/video/installing-mysql-with-debconf)
echo "Downloading MySQL..."
echo "export DEBIAN_FRONTEND="noninteractive"" >> /home/vagrant/.bashrc
echo "cd /vagrant" >> /home/vagrant/.bashrc

# Installing mysql
echo "Preparing mysql-server v.5.x..."
sudo apt-get install -y mysql-server
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password password $DB_PASSWORD"
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password_again password $DB_PASSWORD"

echo "Installing MySQL"
sudo apt-get install -y mysql-server

echo "Done - MySQL is installed!"
