test_recipe_scrape(){
    curl -g -f -s -S -k -H "Accept: application/json" -H "Content-Type: application/json" --data '{"URL": "https://www.allrecipes.com/recipe/26284/penne-with-chicken-and-pesto/"}' "http://localhost:5001/dav-cooks-6405f/us-central1/getRecipeMetaData"
}

test_recipe_scrape
cmd /k