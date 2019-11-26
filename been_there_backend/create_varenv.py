import os

if 'DB_NAME' not in os.environ:
	os.environ['DB_NAME'] = 'postgres'
else :
	print('DB_NAME already defined')

if 'DB_USER' not in os.environ:
	os.environ['DB_USER'] = 'BTMaster'	
else :
	print('DB_USER already defined')

if 'DB_PASSWORD' not in os.environ:
	os.environ['DB_PASSWORD'] = 'BCtn2jAFZL'
else :
	print('DB_PASSWORD already defined')

if 'DB_HOST' not in os.environ:
	os.environ['DB_HOST'] = 'been-there.ciihojrwzxfz.eu-west-3.rds.amazonaws.com'
else :
	print('DB_HOST already defined')

if 'DB_PORT' not in os.environ:
	os.environ['DB_PORT'] = '5445'
else :
	print('DB_PORT already defined')

print('All environment variable created')