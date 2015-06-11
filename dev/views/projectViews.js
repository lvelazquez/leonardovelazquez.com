/**
 * @author Leonardo Velazquez
 * TODO finish mobile slideshow close button should erase project deeplink and hide project
 *
 * slideshow regular
 *
 * slideshow mobile
 *
 */
// The View for a Person
var ProjectView = Backbone.View.extend({
    tagName: "div",
    el: '#project-container',
    template: $("#project-template"),
    initialize: function () {
        var _self = this;
        this.hbtemplate = Handlebars.compile(this.template.html());
        this.projectQueue = [];
        this.transitionTime = 1.25;
        this.transitioning = false;
        this.init = false;
        this.defaultProject = "finder";

        if(!Modernizr.touch){
            this.showProject();
        }

        this.closeBtn = $('.close-project', this.$el);
        this.closeBtn.click(function(e){
            _self.cleanStage();
        });

        this.resize();
    },
    cleanStage: function () {
        var _self = this, tw = null;
        var $prevs = $(".project", this.$el).toArray();

        if ($prevs.length != 0) {
            var item;
            for (var i in $prevs) {
                item = $prevs[i];
                // TRANSITION OUT
                $(item).css({'position':'absolute'});
                tw = TweenLite.to(item,.35, {
                    y: 1000,
                    alpha: 0,
                    ease: Strong.easeOut,
                    onComplete: function (a) {
                        _self.projectQueue = _.without(_self.projectQueue, a.attributes["data-key"].nodeValue);
                        a.remove();
                    },
                    onCompleteParams: [item]
                });
            }
        }

    },
    showProject: function (id) {
        // console.log("ProjectView.showProject() : init = ", this.init, id);
        if(!id) id = this.defaultProject;
        if(id==this.currentProjectId) return;
        this.currentProjectId = id;

        this.cleanStage();

        if(this.projectQueue.indexOf(id)>-1){
            return;
        } else {
            this.projectQueue.push(id);
        }

        var _self = this;

        var p = _self.collection.where({
            id: id
        });

        _self.$el.append(_self.hbtemplate(p[0].attributes));

        $(".carousel", _self.$el).carousel();

        _self.resize();


        var onFinish = function () {
            $('item', $('carousel-inner', _self.$el)).eq(0).addClass("active");
            $('.carousel', _self.$el).carousel();
            _self.resize();
        };
        var currentProject = $(".project[data-key=" + id + "]", this.$el);

        if(!this.init) {
            this.init = true;
            currentProject.show();
            currentProject.css({'position':'relative'});
            onFinish();
        } else {

            // TRANSITION IN
           tw = TweenLite.from(currentProject, this.transitionTime, {
                y: -700,
                alpha: 0,
                ease: Strong.easeOut,
                onStart: function(currentProject) {
                    currentProject.css({'position':'relative'});
                },
               onStartParams: [currentProject],
                onComplete: function(){

                    onFinish();
                }
            });
        }
    },
    resize: function () {
        this.pw = $("#project-container").width();
        $(".project", this.$el).width(this.pw);
    },
    render: function () {
        this.$el.html(this.collection.where({
            id: 0
        }));

        this.assign(this.header, '.header');

        return this;
    }
});

var ThumbView = Backbone.View.extend({
    el: "div#thumb-container",
    template: $("#work-template"),
    events: {
        'click .thumbs':'thumbClicked'
    },
    initialize: function () {
        var _self = this;
        this.render();
        TweenMax.allFrom($(".thumbs", _self.$el), 1, {alpha: 0}, .1);
    },
    thumbClicked: function(e) {
        $(".thumbs", this.$el).removeClass('current-project');
       $(e.currentTarget).addClass('current-project');
    },
    render: function () {

        var template = Handlebars.compile(this.template.html());
        var cp = null;

        this.collection.each(function (project, index) {
            cp = template(project.attributes);
            $(".thumbs-col", this.$el).eq(index % 3).append(cp);
        }, this);

        return this;
    },
    showProjectSml: function(id){
        // take id and get container that has been clicked, (or pass target?)
        // insert div with content data
        var p = this.collection.where({
            id: id
        });
        // clear previous
        // insert in new place


    }
});