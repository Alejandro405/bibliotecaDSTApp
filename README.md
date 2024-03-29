<h1 align="center">Aplicacion Front-End del Catálogo Digital  de la Librería</h1>
<p align="center"> Logo e imagen o gif de la interfaz principal de la herramienta</p>
<p align="center"><img src="https://files.logoscdn.com/v1/assets/13817708/optimized"/></p> 


## Tabla de contenidos:

---

- [Descripción y contexto](#descripción-y-contexto)
- [Funcionalidades de la Aplicación](#funcionalidades-de-la-aplicación)
- [Guía de instalación](#guía-de-instalación)
- [Autor/es](#autores)

## Descripción y contexto
---

Siguiendo con la arquitectura cliente-servidor, esta aplicación tiene como objetivo efectuar peticiones a la aplicación de backend para capturar las respuestas del backend y mostrarla al usuario. De este modo la aplicacion de Front-End actuaría a modo de cliente mientras que la aplicación de Back-End actuaría como servidor.

Las aplicacione hechas con Angular se basan en tres pilares fundamentales: Tempplate, Component, Service. El template representa tanto el continente y el contenido que se le presenta al usuario final. Cada sección del contenido de la aplicacion (catálogo, registro, inicio de sesión...) se modela mediante un componente, cada uno de estos componentes son renderizados en la misma pagina en función de la interactuación del cliente. 

Cada uno de los componentes lleva asociada un fichero html que define la estructura de la información del componente, un fichero css para estilizar el contenido del componente, y un fichero typescript encargado de encapsular el tratamiento de la interactiuación con el ususario con el componente (Botones, búsquedas, selecciones, ...).

Para facillitar el tratamiento de la interactuación con el usuario, es recomendable separarar el control de las interactuaciones del cliente y el componente, con las consultas de información al back-end, para ello se usan los Services. Un Service es un módulo de la aplicación que se encarga de recoger la lógica necesaria para interactiuar con el Back-End, de esta forma los "Component" solo se han de encargar de presentar el resulado de dichas interactuaciones, y variar la forma del componente en función de la interacciones del usuario.

![](./demo/AngularArch.png)

## Funcionalidades de la Aplicación
---

La aplicación está centrada en ofrecer las principales fincionalidades de la prácticas dos y tres de la asignatura, servir un catálogo digital de una librería en el que para acceder a ciertas funcionalidades del mismo es necesario estar registrado dentro de la aplicación. 

El objetivo es administar y consultar el catálogo de la librería, para ello diponemos de medios para agregar, eliminar, editar y buscar libros dentro del catálogo. Para estas operaciones se hace uso del plugin modal JavaScript de Bootstrap, que permite generar pop ups sobre el componente que se esté mostrando en cada momento. 


#### __Añadiendo libros al catálogo:__
![](./demo/addBook.gif)

En este caso tenemos un formulario en la ventana modal para guardar el libro, que se "envía" a la aplicacion al pulsar el boton de "Save Changes":


```{html}
<form #addForm="ngForm" (ngSubmit)="onAddBook(addForm)">
   <div class="form-group">
      <label for="author">Autor</label>
      <input type="text" ngModel name="author" class="form-control" id="author" placeholder="Autor"
         required />
   </div>
   <div class="form-group">
      <label for="title">Título</label>
      <input type="text" ngModel name="title" class="form-control" id="title" placeholder="Título"
         required />
   </div>
   <div class="form-group">
      <label for="summary">Resumen</label>
      <input type="text" ngModel name="summary" class="form-control" id="summary" placeholder="Resumen"
         required />
   </div>
   <div class="form-group">
      <label for="imgURL">Imagen URL</label>
      <input type="text" ngModel name="imgURL" class="form-control" id="imgURL" placeholder="Imagen URL"
         required />
   </div>
   <div class="modal-footer">
      <button type="button" id="add-book-form" class="btn btn-secondary" data-dismiss="modal">
         Close
      </button>
      <button [disabled]="addForm.invalid" type="submit" class="btn btn-primary">
         Save changes
      </button>
   </div>
</form>
```

En la etiqueta de formulario se añade la etiqueta (ngSubmit)="onAddBook(addForm)", lo que hacemos con esto es que al enviar el formulario (click en el boton "Save Changes"), pasamos dicho forulario como argumento al método onAddBook() del fichero typescript del componente (catalog.component.ts). Dicho método tiene como misión: almacenar el nuevo libro en el backend y cerrar la ventana modal:

```{ts}
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {

  //title = 'bibliotecaDSTApp';
  public books: Book[] = [];

  public editBook: Book | undefined;
  public deleteBook: Book | undefined;

  constructor(private bookService: BookService) { }
  
  // Resto del código
  
  public onAddBook(addForm: NgForm): void {
    document.getElementById('add-book-form')!.click();
    this.bookService.addBook(addForm.value).subscribe(
      (response: Book) => {
        console.log(response);
        this.getBooks();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
}
```

Como se dijo anteriormente, la comunicación con el backend no se hs de hacer desde el código del componente, debemos separar la aplicación en capas. Por eso, para almacenar el nuevo libro, se llama al método addBook del servicio BookService, que será el encargado de lanzar la peticion http correspondiente. Al final lo que se hace es delegar la interactuación con el backend a la capa de servicio, así solo nos preocupamos de controlar y manipular la interactuación del cliente con la aplicación, teniendo encuenta la resolución de la peticion http. En este caso basta con cerrar la ventana modal con la primera línea del método, que extrae el elemento del DOM con id "add-book-form" y cierra la ventana modal, simulando el click que haria el usuario para cerrar la ventana manualmente.


```{ts}
@Injectable({
    providedIn: 'root'
})
export class BookService {
    private apiServerUrl = environment.apiBaseUrl.concat("/book");

    constructor(private http: HttpClient) {}
    
    // ...

    public addBook(book: Book | undefined): Observable<Book> {
        return this.http.post<Book>(`${this.apiServerUrl}/add`, book);
    }
    
    // ...
}
```

Como se vé, el servicio solamente se encarga de enviar las peticiones al backend.

#### __Buscando libros dentro del catálogo:__

![](./demo/searchBook.gif)

#### __Eliminando libros del catálogo:__

![](./demo/delBook.gif)


La aplicación también es capaz de logear y registrar usuarios en la plataforma, además de restringir el acceso al catálogo `localhost:4200/catalog` a usuarios registrados y con una sesión activa dentro de la aplicación.

![](./demo/GuardDemo.gif)

Para la implementacion de esta funcionalidad es necesario hacer uso de un recurso de angular conocido como `guard` que se encarga de restringir el acceso al contenido de los componentes de la aplicación. Los guards son facilmente generables atraves del cli de angular mediante `ng generate guard <GuardName>`, dentro de cada guard debemos definir las condicioes que han de satisfacer para renderizar el componente dentro de la página principal del aplicación, por último, una vez definidas las reglas del guard, hay que mapear el guard con la ruta y el componente asociado a la ruta dentro del fichero `app.module.ts`:

``` {r}
{  
     ...
     path: 'catalog',canActivate: [CatalogGuardGuard], canLoad: [CatalogGuardGuard], component: CatalogComponent, 
     ...
     }
```

Por último para almacenar el estado de la sesión actula del usuario, información que será consultada dentro del guard, tanto el componente de loggin, y el guard tienen una variable privada `private cookieService: CookieService` con la que acceder y manipular el estado de la sesión del usuario mediante las siguientes expresiones: 

```{ts}
     this.cookie.set("SessionStatus", "Logged")
     this.cookieService.check('SessionStatus') && this.cookieService.get('SessionStatus') === 'Logged'
 ```


## Guía de instalación
---

En primer lugar es necesario instlar [versiones compatibles](https://angular.io/cli) de [Angular CLI](https://angular.io/cli) y [NodeJS](https://nodejs.org/en/download/)). Se aconseja usar la siguiente configuración para evitar error e incompatibilidades:

```sh { background=true }
❯ ng version


     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/
    

Angular CLI: 15.1.1
Node: 18.10.0
Package Manager: npm 8.19.2
OS: linux x64

Angular: 15.1.1
... animations, cli, common, compiler, compiler-cli, core, forms
... platform-browser, platform-browser-dynamic, router

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1501.1
@angular-devkit/build-angular   15.1.1
@angular-devkit/core            15.1.1
@angular-devkit/schematics      15.1.1
@schematics/angular             15.1.1
rxjs                            7.8.0
typescript                      4.9.4
```

Una vez se tienen las versiones correctas de las librerías y dependencias del entorno basta con ejecutar el siguiente comando `ng serve` para compilar y desplegar el proyecto:

```sh {background=true}
ng version
```

```sh { background=true }
❯ ng serve
✔ Browser application bundle generation complete.

Initial Chunk Files   | Names         |  Raw Size
vendor.js             | vendor        |   2.42 MB | 
polyfills.js          | polyfills     | 314.29 kB | 
styles.css, styles.js | styles        | 211.01 kB | 
main.js               | main          | 145.19 kB | 
runtime.js            | runtime       |   6.53 kB | 

                      | Initial Total |   3.08 MB

Build at: 2023-01-23T16:52:53.188Z - Hash: dc98a05c8957615c - Time: 3331ms

** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **


✔ Compiled successfully.
```

Como viene siendo habitual en las aplicaciones de Angular, la aplicación se alojará por defecto en la siguiente URL `http://localhost:4200`, y se recargará de forma automática segun se salven los cambios en el proyecto.

También es posible compilar de forma manual el proyecto para generar los artefactos para el despliegue con `ng build`, los artefactos serán almacenados en el directorio `dist/`.

## Autor

---

[Alejandro Téllez Montiel](https://github.com/Alejandro405/bibliotecaDSTApp)           
Ale.t@uma.es   
Alejandro405
