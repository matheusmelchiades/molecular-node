#!/bin/bash
set -e;

if [ -n "${MONGO_USERNAME:-}" ] && [ -n "${MONGO_PASSWORD:-}" ]; then
	"${mongo[@]}" "$MONGO_DATABASE" <<-EOJS
	  db.createUser({
      user: $(_js_escape "$MONGO_USERNAME"),
      pwd: $(_js_escape "$MONGO_PASSWORD"),
      roles: [{
        role: $(_js_escape "$MONGO_ROLE"),
        db: $(_js_escape "$MONGO_DATABASE")
      }]
    })
	EOJS
  echo "USER CREATED SUCESSFUL!"
else
  echo ""
fi

dir="/opt/storage"

if [ -d "$dir" ]; then
  for eachfile in `ls -F $dir/*`
  do
    notExt=$(echo $eachfile | cut -d'.' -f1)
    collectionName=$(echo $notExt | cut -d'/' -f4)

    echo "mongoimport --db $MONGO_DATABASE --collection $collectionName --file $eachfile" --jsonArray
    mongoimport --db $MONGO_DATABASE --collection $collectionName --file $eachfile --jsonArray

  done
else

  echo "###### NOT EXTISTS ##########"
  echo "'$dir'"
  echo "#######################"

fi
