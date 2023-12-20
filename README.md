# Junior Frontend Challenge

## **🚀 Front-end development task (Star Wars Edition)**

The **goal** of this task is to showcase your skills doing the following:

1. Building an **intuitive** mobile first UI with a pleasant **UX** using **React**.
2. Working with an external API to fetch data
3. Structuring your development project.

```
💡 this challenge can be done in a take-home form, or in a live coding session. During the live session, you won’t have to cover the whole scope, but can continue working on it for the next day if you choose to do so.
```

```
📣 Read the instructions below before starting
```

- **⚡ Scope**
    - Create a simple Star Wars Squad Builder.
        
        1. See a Star Wars characters overview.
        
        2. Search for a Star Wars character.
        
        3. Access a Star Wars character detail view showcasing related character information.
        
        4 Create a squad of 3/5 characters, based on the criteria below:
        
        - no 2 squad members can be of same species.
        - Your squad should persist during your session
        - See & edit your whole squad
    - Submit your project by creating a github public repository and include usage instructions.
        - make sure you have a clear and easy to follow commit history
    - Details (repo address) should be sent to **[engineering@medbelle.com](mailto:engineering@medbelle.com)**.
- **💾 Data resources**
    
    Data access is available on **REST** and **GraphQL**. Choose the one you prefer. [We suggest using **GraphQL**](https://www.notion.so/Junior-Frontend-Challenge-a6b795e1c3cc448e850c595514f91242?pvs=21)
    
    - **GraphQL** => **[API](https://fe-case-study.vercel.app/api/graphql)**
        - This also contains all authentication methods and Star Wars data access.
    - **REST API**:
        - Base URL => **`https://fe-case-study.vercel.app/api/`**
        - login => **`auth/login`** (POST)
        - signup => **`auth/signup`** (POST)
        - people => **`data/people`**
        - person => **`data/people/:id`**
        - films => **`data/films`**
        - film => **`data/films/:id`**
        - vehicles => **`data/vehicles`**
        - vehicle => **`data/vehicles/:id`**
        - species => **`data/species`**
        - species => **`data/species/:id`**
        - starships => **`data/starships`**
        - starship => **`data/starships/:id`**
- **🎉 Bonus Points**
    
    **Bonus points** for using the stack options we use every day
    
    - **[Tailwind CSS](https://tailwindcss.com/)**
    - Use **[NextJS](https://nextjs.org/)**
    - Use **[Typescript](https://www.typescriptlang.org/)**
    - Use GraphQL [client of your choice, although we use [**Apollo**](https://www.apollographql.com/docs/react/) at Medbelle]
    
    And if you want to showcase some of your other skills & expertise, you can consider the points below, or just surprise us with something unique
    
    - Implement Authentication
        1. A user can signup and login using (email and password):
        
        then you can use authenticated endpoints to 
        
        1.  Setting a character as favorite
        2. Saving a squad for a user
    - Implement tests
    - Documentation of your app

```
🚀 May the force be with you!
```