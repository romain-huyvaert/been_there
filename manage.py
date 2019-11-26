#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():

    # Please fill in the PostgreSQL database informations
    os.environ['DB_NAME'] = ''
    os.environ['DB_USER'] = ''
    os.environ['DB_PASSWORD'] = ''
    os.environ['DB_HOST'] = ''
    os.environ['DB_PORT'] = ''

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
