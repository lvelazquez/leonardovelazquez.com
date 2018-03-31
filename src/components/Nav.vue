<template>
    <nav role="navigation">
            <div class="header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-main-collapse">
                    <i class="fa fa-bars"></i>
                </button>
                <a class="navbar-brand nav-item" href="#/" data-target="#page-top">
                    <img class="top-logo" width="40px" height="40px" src="images/lvlogo.svg"/>
                    <div class="logo-copy">
                        <h3>Leonardo Vel&aacute;zquez </h3>
                        <h3>Software Engineer</h3>
                    </div>
                </a>

                <div class="collapse navbar-collapse navbar-right navbar-main-collapse">
                    <ul class="nav navbar-nav">
                        <li class="hidden">
                            <a href="#/" class="nav-item" data-target="#page-top"></a>
                        </li>
                        <li>
                            <a href="#/work" class="nav-item" data-target="#work">Work</a>
                        </li>
                        <li>
                            <a href="#/about" class="nav-item" data-target="#about">About me</a>
                        </li>
                        <li>
                            <a href="#/contact" class="nav-item" data-target="#contact">Contact</a>
                        </li>
                        <li>
                            <a href="../src/assets/files/LeonardoVelazquezResume.pdf" download="LeonardoVelazquezResume">
                                <i class="download-icon"></i>
                                Resume
                            </a>

                        </li>
                    </ul>
                </div>
                <!-- /.navbar-collapse -->
            </div>
    </nav>
</template>

<script>
    export default {
        name: 'Nav',
        props: {
            msg: String
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
