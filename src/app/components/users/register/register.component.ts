import { Component, Inject, inject} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formulario: FormGroup;

  userService = inject(UsersService)

  constructor(){
    this.formulario = new FormGroup({
      username: new FormControl(),
      is_superuser: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      first_name: new FormControl(),
      last_name: new FormControl(),
      is_staff: new FormControl(),
      is_active: new FormControl(),
      date_joined: new FormControl(),
      direccion: new FormControl(),
      telefono: new FormControl(),
      nombre_empresa: new FormControl(),
      rol_id: new FormControl(),
    });
  }

  async onSubmit() {
    const response = await this.userService.register(this.formulario.value);
    console.log(response)
  }
}