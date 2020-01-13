#Ship challenge

##Setup
###After clone git repository, execute command bellow to create table

```
$ node_modules/.bin/sequelize db:migrate
```

##Import CSV file to JSON
###Use the command bellow to import CSV file to Sqlite
```
$ node [path]/src/imputCsv.js [stores.csv]
```

##GET route
###Use the JSON payload example bellow to fetch the stores list.

```
{
	"latitude" : 42.681478,
    "longitude" : -73.791629
}
```