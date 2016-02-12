<script id="contact-template" type="text/template">

    <div class="contact-form">

        <form id="contact_form" class="input-lg form-group">

            <span class="form-group contact-name contact-info has-feedback">
                <input id="contact_name" type="text" class="contact_info form-control" name="name"
                       placeholder="Your Name"/>
            </span>
            <span class="form-group contact-email contact-info has-feedback">
                <input id="contact_email" type="text"
                       class="contact_info form-control"
                       name="email"
                       placeholder="Your Email"/>
            </span>
            <span class="form-group contact-subject contact-info has-feedback"><input id="contact_subject" type="text"
                                                                                      class="contact_info form-control"
                                                                                      name="subject"
                                                                                      placeholder="Subject"/>
            </span>
            <span class="form-group contact-message contact-info has-feedback">
                <textarea id="contact_message" class="contact_info col-12 form-control"
                          name="message"
                          placeholder="Your Message"></textarea>
            </span>
            <button id="submit" type="submit" class="btn btn-block">
                SUBMIT
            </button>
        </form>
        <div id="statusMsg" style="display:none"></div>
    </div>
</script>


<script id="project-template" type="text/template">

    <div class="project" data-key="">

        <h2 class="title"></h2>
        <a href="#/work/" id="close-btn" class="close-project">&times</a>

        <div id="carousel-example-generic" class="carousel slide wht-frame" data-ride="carousel">
            <!-- Indicators -->

            <ol class="carousel-indicators">

            </ol>

            <!-- Wrapper for slides -->
            <div class="carousel-inner">


            </div>
            <div class="carousel-caption"></div>
            <!-- Controls -->
            <a class="left carousel-control" href="#carousel-example-generic" data-slide="prev">
                <span class="glyphicon glyphicon-chevron-left"></span>
            </a>
            <a class="right carousel-control" href="#carousel-example-generic" data-slide="next">
                <span class="glyphicon glyphicon-chevron-right"></span>
            </a>
        </div>

        <div class="detail">

        </div>
        <div id="project-bg" class="close-project"></div>
    </div>

</script>

<script id="work-template" type="text/template">
    <div data-key="" class="thumbs">
        <div class="caption">
            <div class="caption-wrapper">
                <span class="title"></span>
            </div>
        </div>
        <a href="#/work/"><img class="lazy" data-original="assets/thumbs/"/></a>
    </div>
</script>
