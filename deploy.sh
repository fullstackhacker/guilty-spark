set -e

cd /guilty-sparks/guilty-sparks/

NEW_PROD=guilty-spark-`date +%Y-%m-%d_%H:%M:%S`

git clone git@github.com:kapadiamush/guilty-spark.git $NEW_PROD
(cd $NEW_PROD && npm install)

ln -snf `pwd`/$NEW_PROD current

cd current

echo "Killing old one"
pkill -f 'node guilty.js'
echo "Killed"

echo "Launching new one..."
npm start > /var/log/guilty-spark/guilty-spark.log&
echo "DONE!"
