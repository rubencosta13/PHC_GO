# PHC's Database query handler built with Typescript
---

## Create custom query:

Typescript 
```ts
    import { customQuery } from 'phcgoHandler';
    
    const result = await customQuery("Select * from ul", "Company ID");
    console.log(result);
```