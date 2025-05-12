change is inevitable
let me paint you a picture
- you build an application for a client with a team of a few devs, everything works great
- the client asks to add some new features, no worries, you pop them in
- now they want to remove some features, and add others, thats a little bit more complicated, you'd not considered needing to split those things apart, little code smelly in places, but its out the door
- guess what, theyre back, update one of the features, remove a couple and add another one. You really werent anticipating that last one. You've been pretty speedy to do those last few changes, so why should this be any different? Time pressure pushes and you get a little bit bubblegum and stickytape. You're not proud of it, but it works
- cut to 12 sprints later, the project is really complicated, and you find yourself tracing through half a dozen files to read and understand what a function is trying to do. Productivity is slow, morale is grinding, and things are super fragile.

Now imagine the client wants to create a new version of the app, or you want to move from something like angular to react because of deprecation, or performance reasons. You end up copying over complicated legacy code because its either too painful/too critical/or too time consuming to migrate properly. Effectively bringing with it all the nastiness that last application had.

dont let the hate flow through you. It sounds like a nightmare. And it is. And im sure if this scenario hasnt happened to you yet, it almost certainly will in your career.

all good things are built upon solid foundations
and simply put, the best solid foundation, is project and component structure
a consistent, repeatable, and reasonable approach to this can pave the way for applications as they grow and change

So let's look at an example component. 
Here we have a link component. Very basic. It needs to either use react-router-dom's Link component for internal links, or an anchor with target blank. We want to standardise these into a single component for ease of use, and so that we get the benefits of 'no hard refresh' when using internal links. (This is a little bit of a convoluted example, as im aware react-router has a NavLink component that would take care of this isSelected value for us). In any case, in this file we can see
- a name clash import rename
- inline typings
- a number of hooks, some with memoised logic calculations inside of them
- a conditional render to out either the anchor or Link (now InternalLink)
- its worth noting that these last three hooks are calculated regardless of the isExternal value, despite them only being necessary for InternalLinks (because we cant conditionally render hooks)

Lets imagine we want to test this component. we need to make sure that we test for ... but unfortunately, there are parts of our component we cant add unit tests for. namely ...
This leads to not only poor reusability, but blindspots in our test coverage, and having to bake too much "know how" from the component into our tests

Now let's look at the same component, using a different structure
- a custom hook that returns the necessary component based upon href
- a hook that calls some pure logic memoizing its args
- a pure logic function that returns the correct component based upon more pure logic
- 2 split components responsible for their own renders
- a call to a centralised custom hook that conditionally adds the classname

How much easier is this now to test? 

Sure, you've exchanged fewer files for test coverage and simpler components. And any extra lines of code are mostly boilerplate react. So i ask you, in 6 months time when you come back to this, which are you going to appreciate more? We're not playing code golf. The things you, and your peers are going to appreciate in the long run are
 - ease of readability
 - ease of testability
 - ease of development

Let's cover the rules
 - index.ts
   - this is a barrel export file, it should contain only exports of items within its folder
 - ComponentName.tsx
   - PascalCase
   - this is the only file containing tsx in the folder root
   - it is only responsible for the view
   - at MOST logic in this file should be limited to basic ternary expressions for rendering, and perhaps classnames
 - styles.ts
   - split your classnames out into their own file. i dont care if you're using styled-components, scss, jss, or tailwind (i mean i do care.. use jss, but thats for another day). 
   - keep your views clean by keeping HOW something should look separate from WHAT is being rendered.
 - types folder
   - PascalCase
   - in the same vein as styling, where possible keep your types separate. 
   - This provides you with not only cleaner view files, but the ability to more easily share your types across your project
 - constants folder
   - just like those defined at the root of your project, these should be pure, and immutable
 - hooks/useX/useX.ts
   - barrel export hook, and possibly logic in index.ts
   - custom hooks are plain typescript, no tsx
   - they provide an interface between your view and your logic
   - they are responsible for making sure things only change when they need to
 - hooks/useX/logic/logicFunction.ts
   - camelCase
   - pure, bite sized functions
   - should be used for view logic
   - avoid baking business logic into these files, instead opting for a service
 - child components/
 - contexts/
 - 
 - co-located test files, just test what your file does, provide control over anything impure by mocking it.
   - index.spec.tsx
   - hooks/useX/index.spec.ts
   - hooks/useX/logic.spec.ts
