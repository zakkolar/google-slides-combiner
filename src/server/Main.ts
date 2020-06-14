/**
 MIT License

 Copyright (c) 2020 Zak Kolar (https://zak.io)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 **/

function onOpen(){
    var ui = SlidesApp.getUi();
    ui.createAddonMenu()
        .addItem("Start", 'showSidebar')
        .addToUi();
}
// @ts-ignore
global.onOpen = onOpen;

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function copySlides(folderList, linkSlides){


    var fileArray = [];

    for(let folderId of folderList){
        var folder = DriveApp.getFolderById(folderId);
        // @ts-ignore
        var files = folder.getFilesByType(MimeType.GOOGLE_SLIDES);

        while(files.hasNext()){
            fileArray.push(files.next());
        }
    }



    fileArray = shuffle(fileArray);

    var currentPresentation = SlidesApp.getActivePresentation();

    for(var n = 0; n < fileArray.length; n++){
        var fileID = fileArray[n].getId();

        var slides = SlidesApp.openById(fileID).getSlides();

        for(var i=0; i<slides.length; i++){
            var slide = slides[i];
            var linkingMode = linkSlides? SlidesApp.SlideLinkingMode.LINKED: SlidesApp.SlideLinkingMode.NOT_LINKED;
            currentPresentation.appendSlide(slide, linkingMode);
        }

    }

}
// @ts-ignore
global.copySlides = copySlides;

function showSidebar() {
    var html = HtmlService.createHtmlOutputFromFile('ui/Sidebar')
        .setTitle('Create list of links')
        .setWidth(300);
    SlidesApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
        .showSidebar(html);
}
// @ts-ignore
global.showSidebar = showSidebar;
