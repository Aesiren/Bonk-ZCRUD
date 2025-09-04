# Matrix Inventory Application
# Version 1.0
# Released 04 September 2025
# Author: Evan M. Bonk\


## Requirements:
## WINDOWS:
- Install WSL. Refer to documents here: https://learn.microsoft.com/en-us/windows/wsl/install
- Must have Docker installed and available. Recommend v28.2.2. No other versions tested
-- if you do not have Docker already, refer to Docker install documentation at https://docs.docker.com/
- Must have Node Package Manager (NPM) and Node.js installed. Recommend NPM v10.9.2 and Node v22.16.0. No other versions tested
-- to install NPM/Node, refer to https://nodejs.org/en/download
## Installation:
- Download entire GIT repository. You need backend, frontend, and docker components.
- Run 'npm install' in both frontend and backend folders. Each has a different set of dependencies.
- Ensure that local ports 3000 (backend), 5173 (frontend), and 5432 (docker) are available on your network.
- from the main folder, run command 'docker-compose up --build'. This will build containers for the frontend, backend, database, and local volume. All data will be stored in the local volume.

## Initial Database Config
- Upon running for the first time, the application will check if a database already exists. If not, it will run all required commands to set up the database, tables, and initial seed data. If it already exists, these steps will be skipped.

### Database structure and seed data
- Upon configuration, the application will set up the database in the following configuration:
--crudDB
---tables:
                   user
| user_id | first_name | last_name | username | password |
| auto    |    text    |   text    |  text    |   text   |
                  item
| item_id |    user    | item_name |description| quantity |
| auto    | user FK    |   text    | long text |  integer |

- The application will seed these tables with the following data:
user:
1. John, Anderson, Neo, theone
2. Evan, Bonk, Aesiren, test

item:
1. 1, phone, Your one way out. Answer the call, 1
2. 2, widget, Some random object discovered by archeologists digging in a remote area of Mars. No not that area, the other one., 100
3. 2, test item, It's a test object. What description were you expecting?, 25

* Note: Passwords are sent and stored in clear text. You are encouraged to utilize your own encryption.

## User Guide
### Paths:
- | /              | Home aka /root
- | /login         | Login page
- | /profile       | Edit Profile. Can only be used by the current user
- | /items         | List of items. Options for all items in the system, and all owned items by the current user
- | /items/:itemId | Detail view of a given item.
- | /items/new     | Add item page. Can only be accessed by an authenticated user
- | /signup        | Sign up for an account.

## Sidebar
- The sidebar, or Links section, contains links to most functions. Links will change once a user is logged in.