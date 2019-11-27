# Been There
### Windesheim, University of Applied Sciences - Concept & Creation


## Installation

First clone the repository :
```
git clone https://github.com/romain-huyvaert/been_there.git
```

Then fill in the database credentials in the manage.py :
```
    os.environ['DB_NAME'] = ''
    os.environ['DB_USER'] = ''
    os.environ['DB_PASSWORD'] = ''
    os.environ['DB_HOST'] = ''
    os.environ['DB_PORT'] = ''
```

Once it is cloned & the credentials are filled in go inside the folder and apply migrations :
```
cd been_there/
python manage.py migrate
```

Then launch the backend server using the following command :
```
python manage.py runserver
```

Finally you can access the backend using your browser and going to this URL :

http://127.0.0.1:8000/


## Installation frontend
From the root of the project, go to the frontend folder
```
cd been_there_frontend/beenthere-app
```

Open a console window and install all the dependencies with the following commmand
```
npm install
```

When that is done, start the application
```
npm start
```

Open your browser and go to the following address:
http://127.0.0.1:3000/

##Models modifications (file models.py)

After making a modification inside the models.py file, before running the application use those commands :

```
python manage.py makemigrations
python manage.py migrate
```

Once the migrations are made you can launch the backend server 

```
python manage.py runserver
```
