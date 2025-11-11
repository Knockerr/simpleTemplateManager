<p align="center">
    <img src="https://capsule-render.vercel.app/api?type=cylinder&height=150&color=gradient&text=STM&desc=Simple%20Template%20Manager&fontSize=55&descSize=25&fontAlignY=47&descAlignY=70&fontColor=fff">
</p>

#### A complete and easy to use package to interact with **native HTML templates**
<br/>

### Warning:
I know a lot of frameworks exist and allow to create components way more easily. This project should be considered as a learning project to help me get better at JS and learn how to publish a NPM package rather than a serious project.

---
# ⬇️ Installation
### Install the package;
```npm
npm i simple-template-manager
```
### Importing the package:
```js
import { Template } from 'simple-template-manager';
```

# ❓ How to use
Simple Template Manager allows you to easily manage template using a Template object.
### Create a Template object
```js
const testTemplate = new Template(testTemplateElement);
```

<small>Note: When asked to give an element, you can either use the element id, its class (with or without a dot or a hashtag), or directly the HTML element, it doesn't matter.</small>

### Edit template elements
To do so, get the element you would like to edit, apply all the modifications you would like and end the transformations chain using `.apply`. You can then repeat this operation any number of time you would like.
Exemple:
```js
testTemplate.getElement("templateTitle")
        .setInnerHtml("Hey! Title updated from JS..").apply
    .getElement("templateInput")
        .setValue("Value of an input")
        .setPlaceholder("Placeholder").apply
    .getElement("templateLink")
        .setInnerHtml("Clique to go to google.com")
        .setHref("https://google.com").apply;
```
### Add events listeners
You can add events listeners almost the same way you edit elements. You just have to specify that you want to use the eventManager system using `.events` beforehand.
You can then use one of the [availables premade events](#availableEvents), or add any other one using `addEventListener()`.
Example:
```js
testTemplate.getElement("templateTitle")
        .events.onClick(() => {
            console.info("Title clicked!);
            }).apply
    .getElement("templateInput"); 
``` 
### Add the Template in HTML
You're almost done! Now that your placeholder is correctly defined, you can add it wherever you want in the HTML file! To do so, use `.addInHtml(destination)`.
Example:
```js
testTemplate.addInHtml("templateContainer");
```

### Complete example:
```js
// Creating the template.
const testTemplate = new Template(testTemplateElement);

// Edit template elements
testTemplate.getElement("templateTitle")
        .setInnerHtml("Hey! Title updated from JS..").apply
    .getElement("templateInput")
        .setValue("Value of an input")
        .setPlaceholder("Placeholder").apply
    .getElement("myLink")
        .setInnerHtml("google.com link")
        .setHref("https://google.com").apply;

// Create the demo function that'll be used in the listener.
function demoFunction() {
    console.info("Hey! You just clicked on the button!");
}

// Add the button listener
testTemplate.getElement("demoButton")
    .events.onClick(demoFunction);

// Add the template to the Html
testTemplate.addInHtml("templateContainer");
```

# Helping the project
 > Pull request and code review are open and greatly appreciated! Do not hesitate to get in touch or open github issues if you have ideas on how to make this package better or if you see any errors in the code!

---
### Contact;
* Mail: `knocker.pro@proton.me`
* Discord: `.knocker.`

<p align="center">
    <img src="https://capsule-render.vercel.app/api?type=waving&height=150&color=gradient&section=footer">
</p>
