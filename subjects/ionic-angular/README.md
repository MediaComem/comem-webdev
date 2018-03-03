# Working with Angular in Ionic

Learn to work with [Angular][angular] in an [Ionic][ionic] project.

**Recommended reading**

* [Ionic](../ionic/)
* [Angular](../angular/)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->



## Scaffolding

The `ionic` command comes with its own scaffolding sub-command, `generate`,
which can help you quickly generate new application elements:

```bash
$> ionic generate --help

  ionic generate - Generate pipes, components, pages, directives,
                   providers, and tabs (ionic-angular >= 3.0.0)

    Automatically create components for your Ionic app.

    The given name is normalized into an appropriate naming convention.
    For example, ionic generate page neat creates a page by the name
    of NeatPage in src/pages/neat/.

  ...
```

For example, you can generate a new page by running:

```ts
$> ionic generate page MyPage --no-module
```

(Remove the `--no-module` option if you want to generate a new module along with the component.)



## Navigation

**Web applications** developed with [Angular][angular] usually use the [Angular router][angular-router] for navigation.
However, since we are in an **[Ionic][ionic] application** which will run in a **mobile context**,
the URL-based Angular router is not appropriate to handle our navigation needs.

Instead, Ionic provides its own [`NavController`][ionic-nav-controller] service to handle navigation.

[Navigation][ionic-nav-tutorial] in Ionic works like a simple stack, where we **push new pages onto the top of the stack**,
which takes us **forwards** in the app and shows a back button.
To go **backwards**, we **pop the top page off**.

<p class='center'><img src='images/ionic-nav-stack.png' class='w80' /></p>



### Navigating to a page

Let's start by generating a new page to navigate to:

```bash
$> ionic generate page DetailsPage --no-module
```

This generates a new page component in `src/app/pages/details`.
Update its HTML template to display something:

```html
<!-- ... -->
<ion-content padding>
* Details
</ion-content>
```

#### Registering the new page component

Add the new `DetailsPage` component to the `declarations` and `entryComponents` arrays of your application's module,
typically in `src/app/app.module.ts` in a starter project:

```ts
*import { DetailsPage } from '../pages/details/details';

@NgModule({
  // ...
  declarations: [
    // Other declarations...
*   DetailsPage
  ],
  entryComponents: [
    // Other entry components...
*   DetailsPage
  ]
})
export class AppModule {}
```

#### Using `NavController` to navigate

Now that we have our new page, let's add a `goToDetails()` method in another component to **navigate to it**.
If it's not done already, also inject Ionic's `NavController` in the constructor.
This is how you would do it in a sample `ExamplePage` component:

```ts
// Other imports
import { `NavController`, NavParams } from 'ionic-angular';
*import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-example',
  templateUrl: 'example.html',
})
export class ExamplePage {
  // ...
  constructor(
    // Other constructor parameters...
    `public navCtrl: NavController`
  ) {
    // ...
  }
  // ...
* goToDetails() {
*   this.navCtrl.push(DetailsPage);
* }
}
```

#### Adding a navigation button

Add a `<button>` to your component's HTML template to call the new method:

```html
<!-- ... -->
<ion-content padding>
  <!-- ... -->
* <button ion-button (click)='goToDetails()'>Go to details</button>
</ion-content>
```

You should now be able to navigate to the details page.

Note that a back button should appear to allow you to pop the new page off the navigation stack
(this is done automatically if you have an `<ion-navbar>` tag in the page header).



## Resources

**Documentation**

* [Ionic][ionic-docs]
  * [Navigation][ionic-nav-tutorial]
  * [Navigation Component][ionic-nav-component]
  * [NavController][ionic-nav-controller]
* [Angular][angular-docs]



[angular]: https://angular.io
[angular-docs]: https://angular.io/docs
[angular-router]: https://angular.io/guide/router
[ionic]: http://ionicframework.com
[ionic-docs]: https://ionicframework.com/docs/
[ionic-nav-component]: https://ionicframework.com/docs/components/#navigation
[ionic-nav-controller]: https://ionicframework.com/docs/api/navigation/NavController/
[ionic-nav-tutorial]: https://ionicframework.com/docs/intro/tutorial/navigation/
