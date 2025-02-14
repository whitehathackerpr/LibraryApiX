import pandas as pd
from django.core.management.base import BaseCommand
from library.models import Book, Author

class Command(BaseCommand):
    help = 'Load books and authors from a CSV file into the database'

    def add_arguments(self, parser):
        parser.add_argument(
            '--file_path',
            type=str,
            required=True,
            help='Path to the CSV file containing books and authors data',
        )

    def handle(self, *args, **options):
        file_path = options['file_path']
        
        try:
            # Load the CSV file
            df = pd.read_csv(file_path)
            self.stdout.write(f"Loaded file: {file_path}")

            # Iterate over rows and create authors and books
            for index, row in df.iterrows():
                author, created = Author.objects.get_or_create(
                    name=row['author_name'],
                    defaults={'bio': row['author_bio']}
                )

                Book.objects.get_or_create(
                    title=row['title'],
                    author=author,
                    description=row.get('description', ''),
                    publication_date=row.get('publication_date', None)
                )


            self.stdout.write(self.style.SUCCESS('Successfully loaded books and authors into the database'))

        except FileNotFoundError:
            self.stderr.write(f"Error: File not found at '{file_path}'")
        except Exception as e:
            self.stderr.write(f"An error occurred: {str(e)}")
