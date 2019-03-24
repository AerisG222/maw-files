# script to prepare the production build
SSH_REMOTE_HOST=tifa
SSH_USERNAME=mmorano
PROJECT_ROOT=/home/mmorano/git/maw-files
DIST_ROOT="${PROJECT_ROOT}/dist/maw-files"
TOOLS_ROOT="${PROJECT_ROOT}/tools"
WD=$( pwd )

echo ''
echo '********************'
echo '** BUILD          **'
echo '********************'
# build app
cd "${PROJECT_ROOT}"
ng build --prod

# kill assets used for dev
rm -rf "${DIST_ROOT}/assets"

echo ''
echo ''
echo '********************'
echo '** DEPLOY         **'
echo '********************'
echo 'Would you like to deploy to production? [y/n]'
read DO_DEPLOY

if [ "${DO_DEPLOY}" = "y" ]; then
    rsync -ah "${DIST_ROOT}" "${SSH_USERNAME}"@"${SSH_REMOTE_HOST}":~/

    ssh -t "${SSH_USERNAME}"@"${SSH_REMOTE_HOST}" '
        echo "These commands will be run on: $( uname -n )"

        sudo mv maw-files /srv/www/_files_staging

        sudo chown -R root:root /srv/www/_files_staging
        sudo restorecon -R /srv/www/_files_staging

        if [ -d "/srv/www/maw_files" ]; then
            if [ -d "/srv/www/maw_files.old" ]; then
                sudo rm -rf "/srv/www/maw_files.old"
            fi

            sudo mv "/srv/www/maw_files" "/srv/www/maw_files.old"
        fi

        sudo mv "/srv/www/_files_staging" "/srv/www/maw_files"

        if [ -d /srv/www/_files_staging ]; then
            sudo rm -rf /srv/www/_files_staging
        fi
    '
fi

echo ''
echo '**********'
echo '** DONE **'
echo '**********'
echo ''
