set -e

cd /guilty-sparks/guilty-sparks/

NEW_PROD=guilty-spark-`date +%Y-%m-%d_%H:%M:%S`

git clone git@github.com:kapadiamush/guilty-spark.git $NEW_PROD
(cd $NEW_PROD && npm install)

ln -snf `pwd`/$NEW_PROD current

echo "DONE!"
