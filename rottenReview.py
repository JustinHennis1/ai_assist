from quickstart import ai_request
import re

movies = ai_request()

filter_list = [movie for movie in movies.split('\n') if movie and movie[0].isdigit()]

movie_pattern = re.compile(r'\"(.*?)\"')
year_pattern = re.compile(r'\((\d{4})\)')
special_char_pattern = re.compile(r'[!?;:]')

print(filter_list)

# Initialize lists for movie names and years
movie_names = []
movie_years = []

# Regular expression to match movie names and years
movie_pattern = re.compile(r'\"(.*?)\"')
year_pattern = re.compile(r'\((\d{4})\)')
special_char_pattern = re.compile(r'[^a-zA-Z0-9\s]')

for line in filter_list:
    # Find all movie names
    movies = movie_pattern.findall(line)
    cleaned_movies = []
    
    for movie in movies:
        # Remove special characters and replace spaces with underscores
        cleaned_movie = special_char_pattern.sub('', movie)
        cleaned_movie = cleaned_movie.replace(' ', '_')
        cleaned_movie = cleaned_movie.lower()
        cleaned_movies.append(cleaned_movie)
    
    movie_names.extend(cleaned_movies)
    
    # Find all years
    years = year_pattern.findall(line)
    movie_years.extend(years)

print("Movie Names:", movie_names)
print("Movie Years:", movie_years)


