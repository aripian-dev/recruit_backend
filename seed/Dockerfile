FROM mongo

COPY seed.json /seed.json
CMD mongoimport --host mongodb_container --db brio_test --collection notifications --type json --file seed.json --jsonArray