# Analytics API Medium

## Data:
Example of a trade data JSON object:
```
{
    "id": 1,
    "eventType": "click",
    "user": 1,
    "date": "2020-08-29T08:48:48.737Z"
}
```

## Project Specifications:
The model implementation is provided and read-only.

The task is to implement the REST service that exposes the /analytics endpoint, which allows for ingesting and querying the collection of event records in the following way: 

- POST request to /analytics:
    - creates a set of events serially
    - expects a JSON array containing a series of user events without the id and the date properties as the body payload. Each object in the JSON array must be validated before saving based on the below-mentioned criteria.
    - each list of the events can contain duplicate entries for a user and the event type. Every event object in the list should fulfil the following criteria in order to be saved into the system to avoid duplicates:
    - a user can have only one 'click' event type in a 3-second window. All other 'click' events for the same user in the window should be discarded.
    - a user can have only one 'pageView' event type in a 5-second window. All other 'pageView' events for the same user in the window should be discarded.
    - adds the given event object to the collection of events and assigns a unique integer id to it. The first created event must have id as 1, the second one has id as 2, and so on.
    - adds the date property equal to the current system date to each saved object.
    - the response code is 201, and the response body is a JSON containing the total number of events that were successfully ingested. Sample is :
    ```text
    {"ingested" : 4}
    ```
    - HINT: In order to find an event in a n-second window from current time T, you can use the [Op.gte] operator of sequelize with the value set to the (T-n) seconds.
    ```text
    { date: { [Op.gte] : VALUE} } 
    //Where value is T - n seconds
    ```
    - NOTE: A utility function subtractSecondsFromCurrentTime is provided in the utils.js file which accepts the seconds to subtract from the current time and returns the javascript date object for the time (T-n)
 
- GET request to /analytics:
    - return a collection of all events
    - the response code is 200, and the response body is an array of all events in any sort order
 

- DELETE,PUT,PATCH request to /analytics/<id>:
    - the response code is 405 because the API does not allow deleting or modifying events for any id value
 

You should complete the given project so that it passes all the test cases when running the provided unit tests. The project by default supports the use of the SQLite3 database.

 
## Environment 
- Node Version: ^12.18.2
- Default Port: 8000

**Read Only Files**
- `test/*`

**Commands**
- run: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm start
```
- install: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm install
```
- test: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm test
```
