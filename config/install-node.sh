# Setting Environment Varaibles
echo "Setting environment variables..."
echo "export NODE_ENV=development" >> /home/vagrant/.bashrc
echo "cd /vagrant" >> /home/vagrant/.bashrc

# Installing node
echo "Installing node.js v.7.x..."
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "Done installing node.js!"
