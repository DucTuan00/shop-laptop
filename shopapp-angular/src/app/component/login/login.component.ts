import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginDTO } from '../../dto/user/login.dto';
import { UserService } from '../../service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginResponse } from '../../response/user/login.response';
import { TokenService } from '../../service/token.service';
import { RoleService } from '../../service/role.service';
import { Role } from '../../model/role';
import { UserResponse } from '../../response/user/user.response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  @ViewChild('loginForm') loginForm!: NgForm; // ! to set it always not null
  
  phoneNumber: string = '';
  password: string = '';
  showPassword: boolean = false;

  roles: Role[] = []; // Roles array
  rememberMe: boolean = true;
  selectedRole: Role | undefined; //Variable to save value from dropdown
  userResponse?: UserResponse

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute, 
    private userService: UserService,
    private tokenService: TokenService,
    private roleService: RoleService
  ) {}

  onPhoneNumberChange() {
    console.log(`Phone typed: ${this.phoneNumber}`);
  }

  ngOnInit() {
    //Call API to get roles list and save to variable roles
    debugger
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => { //Using Role[] type
        debugger
        this.roles = roles;
        this.selectedRole = roles.length > 0 ? roles[0] : undefined;
      },
      complete: () => {
        debugger
      },
      error: (error: any) => {
        debugger
        console.error('Error getting roles:', error);
      }
    });
  }

  createAccount() {
    debugger
    // Navigate user to register page
    this.router.navigate(['/register']); 
  }

  login() {
    const message = `phone: ${this.phoneNumber}` +
                    `password: ${this.password}`;
    //alert(message);
    debugger
    
    const loginDTO: LoginDTO = {
      phone_number: this.phoneNumber,
      password: this.password,
      role_id: this.selectedRole?.id ?? 1
    };
    this.userService.login(loginDTO).subscribe({
      next: (response: LoginResponse) => {
        debugger
        const {token} = response;
        if (this.rememberMe) {          
          this.tokenService.setToken(token);
          debugger;
          this.userService.getUserDetail(token).subscribe({
            next: (response: any) => {
              debugger
              this.userResponse = {
                ...response,
                date_of_birth: new Date(response.date_of_birth),
              };    
              this.userService.saveUserResponseToLocalStorage(this.userResponse); 
              if(this.userResponse?.role.name == 'admin') {
                this.router.navigate(['/admin'])
              } else if(this.userResponse?.role.name == 'user') {
                this.router.navigate(['/']);
              }
            },
            complete: () => {
              debugger;
            },
            error: (error: any) => {
              debugger;
              alert(error.error.message);
            }
          })
        }
      },
      complete: () => {
        debugger
      },
      error: (error: any) => {
        //Hanlde bug
        alert(error.error.message);
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
