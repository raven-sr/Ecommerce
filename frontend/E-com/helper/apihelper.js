class apiHelper {
    constructor(query,queryStr){
        this.query= query
        this.queryStr= queryStr
    }
 search() {
    const key = this.queryStr.keyword
        ? {
            $or: [
                {
                    brand: {
                        $regex: this.queryStr.keyword,
                        $options: "i"
                    }
                },
                {
                    category: {
                        $regex: this.queryStr.keyword,
                        $options: "i"
                    }
                },
                {
                    name: {
                        $regex: this.queryStr.keyword,
                        $options: "i"
                    }
                }
            ]
        }
        : {};

    this.query = this.query.find(key);

    return this;
}
    filter(){
        const queryCopy = {...this.queryStr}
        const removeFields = ['keyword','page','limit']
        removeFields.forEach((fields)=>{
            delete queryCopy[fields]
        })
         if (queryCopy.category) {
        queryCopy.category = {
            $regex: `^${queryCopy.category}$`,
            $options: "i"
        };
    }
        this.query=this.query.find(queryCopy)
        return this
    }
    pagination(resultPerPage){
        const currPage = Number(this.queryStr.page) || 1
        const skip = resultPerPage * (currPage-1)
        this.query.limit(resultPerPage).skip(skip)
        return this
    }
}

export default apiHelper