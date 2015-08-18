# chrome-annotate :memo:

This is the second part in the WebRTC [annotation experiment](https://github.com/ahoskins/chrome-notes).

chrome-annotate is a way to make annotations directly in-page, share them over WebRTC, and annotate on top of a peer's annotations.
Annotation tools exist -- the most recent, popular, and intriguing is [genious.it](http://genius.it/ejohn.org/files/jquery-original.html).
Right now, genious.it can be used in two main ways:

1. rehosts an existing URL as a subdomain on their site.  For example: http://genius.it/ejohn.org/files/jquery-original.html is the annotated version.
And http://ejohn.org/files/jquery-original.html is the original.
2. the content author includes a genious.it javascript file that allows their site to be annotatable.

chrome-annotate aims to bring annotation without the overhead of *a)* having to rehost a site and *b)* relying on web authors to include special functionality.
The goal is to have notes transferred over WebRTC and  transparently stored in local-storage.  The
end result, is being able to see annotations on the **original** URL **without** content author's having to add functionality.
It's a beautiful way to scale annotations to any page on the web.

This project is still very much in progress, but a demo should be available soon.
