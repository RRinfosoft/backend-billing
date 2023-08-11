class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i",
                }
            }
            : {};
        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const querCopy = { ...this.queryStr };
        // console.log(querCopy);

        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach(key => delete querCopy[key]);
        // console.log(querCopy);

        this.query= this.query.find(querCopy);
        return this;
    }
}

module.exports = ApiFeatures