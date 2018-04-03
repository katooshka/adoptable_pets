Here are some notes on the experience I got while completing the challenge. 

### What I found challenging:

This was quite a cool exercise and I learned a lot from it. Now I have some knowledge on how to create responsive web pages, I also gained more experience on full-stack development in general and especially on how to work with React framework. 

The most challenging part to me was the front-end part, as I have substantially more experience with back-end development. I spent quite a lot amount of time trying to make different libraries work smoothly with each other (Material-UI + Bootstrap) and find versions that are suitable for my project. 

It also took time to break down the whole client code into different components, make the data flow easy to follow and avoid using duplicate code.

### Resources I used:

Preparing React project environment can be a long and tedious process, so I used the structure from [one of my projects](https://github.com/katooshka/ethnostars/) that I created a couple of months ago. In turn, while creating the latest project structure I was using [the following guide (in Russian)](https://habrahabr.ru/post/324232/).

I used a lot of React components from [Material-UI](http://www.material-ui.com/) library and I was also using the documentation they provided as the primary guide.

I also found a lot of help in MongoDB documentation and in numerous articles over the internet.

### What can be improved:

**Change images source.** Currently the images are represented as links to external resources, which is not a reliable approach as they can be changed or deleted at any moment of time. So they should be stored in some BLOB database and fetched from the server instead of relying on external resourses. 

**Improve autocomplete feature.** Now there is a basic Material-UI implementation - the suggested autocomplete text items are shown if a user inputs a substring of these items. To check whether this item should be shown, the code iterates over the whole possible items.

We can consider different scenarios. If the number of the possible pets names is very large, the default approach is not a very efficient one. It would be better to use a trie data structure which will make searching for the autocomplete item more time efficient. Or, if the number of names is too big, the whole list of names should not be loaded to the client, instead the client should fetch options from the server every time the input changes.

We also may want to suggest the most commonly used names to the user. In this case we will need to add additional ‘weight’ property to the name itself (the number of time it appears in the database).
