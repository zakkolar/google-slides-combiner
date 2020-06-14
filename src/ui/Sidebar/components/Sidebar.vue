<template>
    <div class="sidebar branding-below">
        <div class="loader" id="loader" v-if="loading">
            <svg class="circular" viewBox="25 25 50 50">
                <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
            </svg>
        </div>
        <form id="main" v-if="!loading">
            <div class="block form-group">
                <b>Folder IDs</b>
                <p>To get the folder ID, open the folder in Google Drive. In the URL for the folder, copy everything after folder/. Click the image below to see a bigger screenshot.</p>
                <a href="https://drive.google.com/uc?export=view&id=1HumT38j-SWqi5KmbkXGtaAwLmvHn8KW9" target="_blank"><img src="https://drive.google.com/uc?export=view&id=1HumT38j-SWqi5KmbkXGtaAwLmvHn8KW9" alt="Select everything after /folder/ in the URL of your folder in Google Drive to get the ID" style="width: 500px; max-width: 100%; height: auto" title="Click for the larger version." /></a>
                <div v-for="(folder,index) in folders">
                    <input v-model="folder.id" v-bind:id="`folder-${index}`" type="text"><label v-bind:for="`folder-${index}`" class="sr-only">Folder URL</label> <a href="#" @click.prevent="folders.splice(index,1)" class="delete" v-if="folders.length>1">(remove)</a>
                </div>
                <button @click.prevent="folders.push({id: ''})">Add another folder</button>
            </div>

            <div class="block form-group">
                <label><input type="checkbox" v-model="linkSlides"> <b>Link slides to source</b></label>
                <p>Linking slides to their source allows you to pull any changes that are made to the Slides in the original presentation into this presentation. <a href="https://support.google.com/docs/answer/7009814?co=GENIE.Platform%3DDesktop&hl=en" target="_blank">Learn more</a>.</p>
            </div>

            <div class="block" id="button-bar">
                <button class="blue" id="generate" @click.prevent="importSlides">Import slides</button>


            </div>
            <div id="error" class="error" v-if="error">{{error}}</div>
        </form>
    </div>

</template>

<script>
    export default {
        data(){
            return {
                folders: [{
                    id: ''
                }],
                linkSlides: false,
                loading: false,
                error: null
            }
        },
        methods: {
            importSlides(){

                const folders = this.folders.filter((folder)=>{
                    return folder.id !== "";
                }).map((folder)=>{
                    return folder.id;
                });


                this.loading = true;
                this.error = null;
                google.script.run
                    .withSuccessHandler((response)=>{
                        this.loading = false;
                    })
                    .withFailureHandler(
                        (msg)=>{
                            this.error = msg;
                            this.loading = false;
                        })
                    .copySlides(folders, this.linkSlides);

            }
        }
    }
</script>
<style lang="scss">
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        border: 0;
    }
    .delete{
        color: red;
        &:hover{
            text-decoration: none;
        }
    }




    .loader {
        position: relative;
        margin: 0 auto;
        width: 100px;
    }
    .loader:before {
        content: '';
        display: block;
        padding-top: 100%;
    }

    .circular {
        -webkit-animation: rotate 2s linear infinite;
        animation: rotate 2s linear infinite;
        height: 100%;
        -webkit-transform-origin: center center;
        transform-origin: center center;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }

    .path {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        -webkit-animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
        animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
        stroke-linecap: round;
    }

    @-webkit-keyframes rotate {
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    @keyframes rotate {
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes dash {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35px;
        }
        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124px;
        }
    }
    @keyframes dash {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35px;
        }
        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124px;
        }
    }
    @-webkit-keyframes color {
        100%,
        0% {
            stroke: #d62d20;
        }
        40% {
            stroke: #0057e7;
        }
        66% {
            stroke: #008744;
        }
        80%,
        90% {
            stroke: #ffa700;
        }
    }
    @keyframes color {
        100%,
        0% {
            stroke: #d62d20;
        }
        40% {
            stroke: #0057e7;
        }
        66% {
            stroke: #008744;
        }
        80%,
        90% {
            stroke: #ffa700;
        }
    }
    body {
        background-color: #eee;
    }
</style>
