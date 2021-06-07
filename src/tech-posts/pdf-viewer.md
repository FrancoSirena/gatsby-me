---
slug: "/tech-notes/pdf-viewer"
date: "2021-06-01"
title: "How to create your very own PDF Viewer with React"
summary: "Simple example of how to render PDFs in the browser powered by `pdfjs` lib."
---

If you got here I can only assume you are wondering how to render a PDF in a declarative way, well with this article I have all intentions to help you achieving that with little to no effort, thanks to the awesome [pdfjs](https://mozilla.github.io/pdf.js/).

In this article I will give you a brief and simple idea of what you can do with a little lines of code to get a blob PDF rendered in your browser, that can be quite handy if all you need is a simple PDF viewer.

## The pdfjs package

First things first, we need to introduce this awesome package which powers most of the PDF viewers that we have out there, it was written by the mozilla team a few years ago and is extremely powerful. I definitely recommend you checking their [docs](https://github.com/mozilla/pdf.js).

That package is it, a `javascript` package that you build on top of to make your own PDF Viewer layers and adapt as you need to fit in the framework of your choice.

The package itself uses a webworker to make the process much faster and avoid melting down the user machine, and as it uses modern browser APIs I will already tell you, if you came here looking for an IE11 solution, this post won't help you with it ):, if you are looking for a solution with older browsers they do have previous versions that work it, so I recommend you to check it out.

### Bundle and bundling

Well, this title is not the best one I think, right? It has a reason, because you can use the [pdfjs-dist](https://github.com/mozilla/pdfjs-dist) or you can build your own version of it by downloading the `pdfjs` one and building it, yes it is as simple as that but each choice has its pros and cons.

If you decide to go with the `dist` one you must be aware that you need to transpile it on your end, since it uses async/await and ReadableStreams so be ready to add it to your babel-loader plugin.

If you will built it yourself, well then you can clone the repo and add the things you need or rip out the pieces you don't need, that can help you.

For my project adding the `pdfjs-dist` cost us an extra js of roughly 200kb, it is not little but I think by all means it is worth it if you are properly lazy loading things those kb will only bite you when you get to the previewing part.

## Worker and build

Before we start, let's remember to install the package:

```js
yarn install pdfjs-dist
```

As we are going to use `React` and `webpack` here, I need to point out that you need to find a way to make the `worker` consumable in the browser and to do that I am going to show you how:

_Webpack 5_

```js
//... your config
module: {
  rules: [
    //... your rules
    {
      test: /pdfjs-dist\/build\/pdf.worker/,
      include: /node_modules/,
      type: "asset",
    },
  ]
}
```

_Webpack <5_

```js
//... your config
module: {
  rules: [
    //... your rules
    {
      test: /pdfjs-dist\/build\/pdf.worker/,
      include: /node_modules/,
      loader: "worker-loader", // you can even use 'file-loader' here
    },
  ]
}
```

With that we can now import it in your component without trouble.

## Reactying

OK, now that we have the worker provisioned we can start to dream about our component.

The way this works is that the `pdfjs-dist` exposes a few methods that let you load PDFs from different sources, such as, Binary (UInt*Array, Float*Array), URL, or even a Base64, you can find more about the options in their [api](https://github.com/mozilla/pdf.js/blob/master/src/display/api.js).

In my example I will work with a Binary data, but making that based on a `Blob` just because I want to make it more real.

So let's get to it.

_Our PDF Loader_

```jsx
import * as pdfjs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker";
// we need to tell who is our worker
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function toFile(blob) {
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(new Uint8Array(reader.result));
    reader.onerror = () => {
      // You can add much more to this and catch specific examples
      reject(new Error("Unable to convert Blob to Uint."));
    };
    reader.readAsArrayBuffer(file);
  });
}

function PDFLoader({
  blob, // this can come from an API response on from the source file
}) => {
  const [state, setState] = useState({
    status: "empty",
    result: undefined,
  });

  useEffect(() => {
    setState({
      result: null,
      status: "pending",
    });
    toFile(blob)
      .then((file) => {
        return pdfjs.getDocument({
          data: file,
        }).promise;
      })
      .then((pdf) =>
        setState({
          result: pdf,
          status: "fulfilled",
        })
      )
      .catch(() =>
        setState({
          status: "failed",
        })
      );
  }, [blob]);

  if (state.status === 'failed') {
    return <div>Ooops</div>
  }
  if (state.status !== "fulfilled") {
    return <LoadingIndicator />;
  }

  return <PDFViewer pdf={state.result.pdf} />;
};
```

As you can see we are doing a few things there:

- Provisioning the worker

- Transforming our Blob into a Binary using the Uint8Array and FileReader to do that.

- Calling the `getDocument` providing our very own data from the transform

- Storing that result in our internal state

Ok, with all of that now we actually play with our `result` which has a lot in it.

I am going to stick with the basics:

- The `result` will have a `pdf` in it that is in an instance of `PDFDocumentProxy`, which offers a few methods, I am just going to highlight 2 of them:
  - `getPage`: A promise that returns the representation of a page that can be rendered in a `canvas`
  - `numPages`: A property that returns the total number of pages so then you can transverse it and get your pages

With those two methods we can now render page by page or all of them at once if you please:

_Our Viewer_

```jsx
function PDFViewer({ pdf, title="Awesome PDF" }) {
  const [pageIndex, setPageIndex] = useState(1)

  function previousPage() {
    setPageIndex(prev => prev - 1 === 1 ? prev : prev -1)
  }

  function nextPage() {
    setPageIndex(prev => prev + 1 > pdf.numPages ? prev : prev + 1)
  }
  return (
    <section>
      <h1>{title}</h1>
      <div>
        <button type="button" onClick={previousPage}>Previous</button>
        <button type="button" onClick={nextPage}>Next</button>
      </div>

      <PDFPage pageIndex={pageIndex} pdf={pdf}>
    </section>)
}
```

_Our Page_

```jsx
function PDFPage({ pageIndex, pdf }) {
  const [ready, setReady] = useState()
  const [page, setPage] = useState()
  const ref = useRef()

  useEffect(() => {
    pdf.getPage(pageIndex).then(setPage).catch(errorHandler)
  }, [pdf, pageIndex])

  useEffect(() => {
    if (ready && page) {
      const ctx = canvas.current.getContext("2d")
      const view = page.getViewport() // you can provide a few options here to how you want to render your Page.

      canvas.current.width = view.width
      canvas.current.height = view.height

      page.render({
        viewport: view,
        canvasContext: ctx,
      })
    }
  }, [ready, page])

  return (
    <canvas
      ref={e => {
        if (e) {
          ref.current = e
          setReady(true)
        }
      }}
    />
  )
}
```

Let's not talk about our `Viewer` because there is so little to cover, but our `Page` is what actually matters.

What we are doing here is rendering a `canvas` and telling `pdfjs` page to render in its context, with very few lines of code we can easily do that.

This very simple and straight forward, it doesn't have any sugarcoat on it, but from here you can do it a whole lot of things because now the bare bones of it you already have.

## Conclusion

With very few lines of code you can easily get a PDF Viewer in our browser, from there you can expand to however you want or need, which is awesome. The package itself offers a whole lot of things including support for comments, attachments, links, and so on.

From here you can expand your very own renderer to whatever your needs are.

Things to remember are that all those `promises` are not cancellable by default so you may need to handle to cleanup by yourself with some wrappers. Also I would highly recommend adding error handlers throughout the tree, so you are not caught up with surprises.

Hope you enjoyed it as much as I did reading and learning how to do this.
