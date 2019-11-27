#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():

    # Please fill in the PostgreSQL database informations
    os.environ['DB_NAME'] = 'postgres'
    os.environ['DB_USER'] = 'BTMaster'
    os.environ['DB_PASSWORD'] = 's5KHqmt4HGYtp5Ft'
    os.environ['DB_HOST'] = 'been-there.ciihojrwzxfz.eu-west-3.rds.amazonaws.com'
    os.environ['DB_PORT'] = '5445'

    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'been_there_backend.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
