//Topic--> Add wrapAsync ,, Project Phase 1 (Part C)

module.exports = (fn) =>{
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};