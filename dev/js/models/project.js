var Project = Backbone.Model.extend({
    defaults: {
        id: "def-project",
        thumb: "demo_project.jpg",
        thumbWidth: "200",
        thumbHeight: "200",
        title: 'Guest User',
        description: 'Worker',
        type: 'html/css',
        images: [{
            image_url: "sale1.jpg"
        }, {
            image_url: "sale2.jpg"
        }, {
            image_url: "sale3.jpg"
        }]
    }
});

var ProjectList = Backbone.Collection.extend({
    model:Project
});

