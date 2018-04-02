#/bin/bash

set -e

echo 'Start script.'

echo 'Installing NodeJS...'
curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
sudo yum -y install nodejs

echo 'Installing packages...'
npm install

echo 'Downloading MongoDB...'
sudo touch /etc/yum.repos.d/mongodb-org-3.4.repo
sudo chmod 777 /etc/yum.repos.d/mongodb-org-3.4.repo
sudo cat <<EOF >/etc/yum.repos.d/mongodb-org-3.4.repo
[mongodb-org-3.4]
name=MongoDB 3.4 Repository
baseurl=https://repo.mongodb.org/yum/amazon/2013.03/mongodb-org/3.4/x86_64/
gpgcheck=0
enabled=1
EOF
sudo yum install -y mongodb-org

echo 'Starting MongoDB...'
sudo service mongod start

echo 'Importing data to MongoDB...'
sudo npm install -g csvtojson
./data/import.sh

echo 'Starting the application...'
sudo npm run build-prod

