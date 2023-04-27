export default class ApiFeatures {
    
    constructor(mongooseQuery,queryString){
        this.mongooseQuery = mongooseQuery
        this.queryString = queryString
    }

    paginate()
    {
        //handle pagination
        let page = Math.max(this.queryString.page*1 || 1 , 1)
        let skip = (page-1)*5
        this.page = page
        this.mongooseQuery.skip(skip).limit(5)
        return this
    }

    filter()
    {
        // handle filteration
        // Deep copy but why ?
        /* answer: because I will need the things like sort,page .... later so I want to only take a copy not a pointer 
        to the same object bacause if I take a pointer to the same object 
        modification to req.query or filterObject will have the same impact because both reference the same object in memery 
        */
        let filterObject = {...this.queryString}
        // array of words to be removed from filteration object
        let excludedWordsFromFilterObject = ['page','fields','sort','keyword']
        // loop on filterObject and delete the four words if exist
        excludedWordsFromFilterObject.forEach((elm)=>{delete filterObject[elm]})
        // adding $ to each key of filterObject
        // first convert it to string so you can use replace method in String
        // recall : using toString() will not convert the object to string but it will be the format of "object"
        filterObject = JSON.stringify(filterObject)
        // we will replace the operator in the string with $operator
        // the second parameter of replace can be a function that take a agrument with value of the first parameter of replace function
        // /g in regex to make it global to match all occurrence not only the first occurrence
        filterObject = filterObject.replace(/\b(gt|gte|lt|lte)\b/g, match=> `$${match}`)
        // convert the string to object again
        filterObject = JSON.parse(filterObject)
        this.mongooseQuery.find(filterObject)
        return this
    }

    sort()
    {
        // handle sorting
        if(this.queryString.sort)
        {
            // why we split first? 
            // answer : beacuse the attributes must be separated by space not ','
            // split function returns array of attributes to sort with
            // join is an array method to convert the array to string whose words separated by the value it take which is space here
            // to summerize it convert price,sold -----> price sold
            let sortAttributes = this.queryString.sort.split(',').join(' ')
            // chaining is available on the query
            this.mongooseQuery.sort(sortAttributes)
        }
        return this

    }

    search()
    {
        // handle search by keyword
        if(this.queryString.keyword)
        {
            // regex only to make search insenstive
            // $or to make search on title or description
            this.mongooseQuery.find(
                {
                    $or:
                    [{title:{$regex:this.queryString.keyword,$options:'i'}},{description:{$regex:this.queryString.keyword,$options:'i'}}]
                })
        }
        return this
    }

    fields()
    {
        // handle selected fields (like sort)
        if(this.queryString.fields)
        {
            let selectedAttributes = this.queryString.fields.split(',').join(' ')
            this.mongooseQuery.select(selectedAttributes)
        }
        return this
    }

}