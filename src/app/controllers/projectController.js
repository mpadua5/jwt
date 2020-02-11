module.exports = {
    getProjects: function (req,res) {
        console.log("Processin ** /projects")
        return res.send({ OK : true, user: req.userId });
    }
}