// Get our requirements, installed by npm
const Metalsmith  = require('metalsmith');
const markdown    = require('@metalsmith/markdown');
const collections = require('@metalsmith/collections');
const layouts     = require('@metalsmith/layouts');
const browserSync = require('metalsmith-browser-sync');

// Run Metalsmith in the current directory.
// When the .build() method runs, this reads
// and strips the frontmatter from each of our
// source files and passes it on to the plugins.
Metalsmith(__dirname)

.source('./src')            // source directory
.destination('./build')     // destination directory
.clean(true)                // clean destination before
.use(markdown())
.use(collections({          // group all blog posts by internally
    posts: 'posts/*.html',       // adding key 'collections':'posts'
    pages: {
        pattern: '*.html',
        filterBy: function (file) {
            return file.show_in_nav
        },
        sortBy: "order"  
    }
}))                         // use `collections.posts` in layouts

// Use @metalsmith/markdown to convert
// our source files' content from markdown
// to HTML fragments.


// Put the HTML fragments from the step above
// into our template, using the Frontmatter
// properties as template variables.
.use(layouts())
// .use(browserSync({
//     server: "./build",
//     files: ["src/**/*.md", "layouts/**/*.hbs"]
// })
// )
// And tell Metalsmith to fire it all off.
.build(function(err, files) {
    if (err) { throw err; }
});