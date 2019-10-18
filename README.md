# Been There
### Windesheim, University of Applied Sciences - Concept & Creation


## Installation

First clone the repository :
```
git clone https://github.com/romain-huyvaert/been_there.git
```

Once it is cloned go inside the folder and apply migrations :
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