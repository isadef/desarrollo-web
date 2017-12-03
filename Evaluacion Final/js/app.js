var Calculadora = {
  num1: 0,
  num2: 0,
  operador: "",
  antesOperador: false,
  puntoDecimal: "",
  veces: 0,
  flag: true,
  presionarTecla: function(clicked)
  {
    clicked.style.transform = 'scale(0.9)';
  },
  soltarTecla: function(clicked)
  {
    clicked.style.transform = 'scale(1.0)';
    this.funcionTecla(clicked);
  },
  funcionTecla: function(clicked)
  {
    //console.log(this.num1 + " - " + this.num2)
    var id = clicked.id;
    var valor = "";
    switch(id)
    {
      case "0":
        valor = 0;
        this.ponerNumero(valor);
        break;
      case "1":
        valor = 1;
        this.ponerNumero(valor);
        break;
      case "2":
        valor = 2;
        this.ponerNumero(valor);
        break;
      case "3":
        valor = 3;
        this.ponerNumero(valor);
        break;
      case "4":
        valor = 4;
        this.ponerNumero(valor);
        break;
      case "5":
        valor = 5;
        this.ponerNumero(valor);
        break;
      case "6":
        valor = 6;
        this.ponerNumero(valor);
        break;
      case "7":
        valor = 7;
        this.ponerNumero(valor);
        break;
      case "8":
        valor = 8;
        this.ponerNumero(valor);
        break;
      case "9":
        valor = 9;
        this.ponerNumero(valor);
        break;
      case "mas":
        this.antesOperador = false;
        this.operador = this.suma;
        this.num2 = 0;
        this.puntoDecimal = false;
        this.mostrar("");
        break;
      case "menos":
        this.antesOperador = false;
        this.operador = this.resta;
        this.num2 = 0;
        this.puntoDecimal = false;
        this.mostrar("");
        break;
      case "por":
        this.antesOperador = false;
        this.operador = this.multiplicacion;
        this.num2 = 0;
        this.puntoDecimal = false;
        this.mostrar("");
        break;
      case "dividido":
        this.antesOperador = false;
        this.operador = this.division;
        this.num2 = 0;
        this.puntoDecimal = false;
        this.mostrar("");
        break;
      case "igual":
        this.igual();
        break;
      case "on":
        this.on();
        break;
      case "punto":
        if (!this.puntoDecimal)
        {
          if (!this.flag)
          {
            this.puntoDecimal = true;
            this.veces = 10;
            this.mostrar(".")
          }
        }
        break;
      case "sign":
        this.cambiarSigno();
        break;
    }
  },
  cambiarSigno: function()
  {
    if (this.antesOperador)
    {
      this.num1 = -this.num1;
      this.mostrar(this.num1);
    }
    else
    {
      this.num2 = -this.num2;
      this.mostrar(this.num2);
    }
  },
  ponerNumero : function(valor)
  {
    if (this.flag && this.antesOperador)
    {
      this.num1 = 0;
      this.puntoDecimal = false;
      this.flag = false;
    }
    if (this.antesOperador)
    {
      if (this.puntoDecimal)
      {
        this.num1 = this.num1 + (valor/this.veces);
        this.veces = this.veces*10;
      }
      else
      {
        this.num1 = (this.num1*10) + valor;
      }
      this.mostrar(this.num1);
    }
    else
    {
      if (this.puntoDecimal)
      {
        this.num2 = this.num2 + (valor/this.veces);
        this.veces = this.veces*10;
      }
      else
      {
        this.num2 = (this.num2*10) + valor;
      }
      this.mostrar(this.num2);
    }
  },
  on: function()
  {
    this.num1 = 0;
    this.num2 = 0;
    this.operador = "";
    this.antesOperador = true;
    this.puntoDecimal = false;
    this.veces = 1;
    this.flag = true;
    this.mostrar(0);
  },
  mostrar: function(valor)
  {
    var pantalla = document.getElementById("display");
    if (typeof valor != "string")
    {
      valor = valor.toString();
    }
    if (valor.length > 8)
    {
      valor = valor.substring(0,8);
    }
    if (valor != ".")
    {
      pantalla.innerHTML = valor;
    }
    else
    {
      pantalla.innerHTML = pantalla.innerHTML + valor;
    }
  },
  igual: function()
  {
    if (typeof this.operador == "function")
    {
      this.num1 = this.operador();
      this.mostrar(this.num1);
      this.antesOperador = true;
      this.flag = true;
      if (this.num1 !== parseInt(this.num1))
      {
        this.puntoDecimal = true;
      }
    }
  },
  suma: function()
  {
    return this.num1 + this.num2;
  },
  resta: function()
  {
    return this.num1 - this.num2;
  },
  multiplicacion: function()
  {
    return this.num1 * this.num2;
  },
  division: function()
  {
    if (this.num2 == 0)
    {
      alert("No se puede realizar una division entre 0, se tomara el segundo numero como 1");
      this.num2 = 1;
    }
    return this.num1 / this.num2;
  },
  init: function()
  {
    var self = this;
    this.numl = 0;
    this.num2 = 0;
    this.operador = "";
    this.puntoDecimal = false;
    this.antesOperador = true;
    this.veces = 1;
    this.flag = true;
    var n0= document.getElementById("0");
    var n1= document.getElementById("1");
    var n2= document.getElementById("2");
    var n3= document.getElementById("3");
    var n4= document.getElementById("4");
    var n5= document.getElementById("5");
    var n6= document.getElementById("6");
    var n7= document.getElementById("7");
    var n8= document.getElementById("8");
    var n9= document.getElementById("9");
    var opSuma= document.getElementById("mas");
    var opResta= document.getElementById("menos");
    var opMult= document.getElementById("por");
    var opDiv= document.getElementById("dividido");
    var on= document.getElementById("on");
    var sign= document.getElementById("sign");
    var raiz= document.getElementById("raiz");
    var punto= document.getElementById("punto");
    var igual= document.getElementById("igual");
    n0.onmousedown = function(e)
    {
      self.presionarTecla(n0);
    };
    n0.onmouseup = function(e)
    {
      self.soltarTecla(n0);
    };
    n1.onmousedown = function(e)
    {
      self.presionarTecla(n1);
    };
    n1.onmouseup = function(e)
    {
      self.soltarTecla(n1);
    };
    n2.onmousedown = function(e)
    {
      self.presionarTecla(n2);
    };
    n2.onmouseup = function(e)
    {
      self.soltarTecla(n2);
    };
    n3.onmousedown = function(e)
    {
      self.presionarTecla(n3);
    };
    n3.onmouseup = function(e)
    {
      self.soltarTecla(n3);
    };
    n4.onmousedown = function(e)
    {
      self.presionarTecla(n4);
    };
    n4.onmouseup = function(e)
    {
      self.soltarTecla(n4);
    };
    n5.onmousedown = function(e)
    {
      self.presionarTecla(n5);
    };
    n5.onmouseup = function(e)
    {
      self.soltarTecla(n5);
    };
    n6.onmousedown = function(e)
    {
      self.presionarTecla(n6);
    };
    n6.onmouseup = function(e)
    {
      self.soltarTecla(n6);
    };
    n7.onmousedown = function(e)
    {
      self.presionarTecla(n7);
    };
    n7.onmouseup = function(e)
    {
      self.soltarTecla(n7);
    };
    n8.onmousedown = function(e)
    {
      self.presionarTecla(n8);
    };
    n8.onmouseup = function(e)
    {
      self.soltarTecla(n8);
    };
    n9.onmousedown = function(e)
    {
      self.presionarTecla(n9);
    };
    n9.onmouseup = function(e)
    {
      self.soltarTecla(n9);
    };
    opSuma.onmousedown = function(e)
    {
      self.presionarTecla(opSuma);
    };
    opSuma.onmouseup = function(e)
    {
      self.soltarTecla(opSuma);
    };
    opResta.onmousedown = function(e)
    {
      self.presionarTecla(opResta);
    };
    opResta.onmouseup = function(e)
    {
      self.soltarTecla(opResta);
    };
    opMult.onmousedown = function(e)
    {
      self.presionarTecla(opMult);
    };
    opMult.onmouseup = function(e)
    {
      self.soltarTecla(opMult);
    };
    opDiv.onmousedown = function(e)
    {
      self.presionarTecla(opDiv);
    };
    opDiv.onmouseup = function(e)
    {
      self.soltarTecla(opDiv);
    };
    on.onmousedown = function(e)
    {
      self.presionarTecla(on);
    };
    on.onmouseup = function(e)
    {
      self.soltarTecla(on);
    };
    sign.onmousedown = function(e)
    {
      self.presionarTecla(sign);
    };
    sign.onmouseup = function(e)
    {
      self.soltarTecla(sign);
    };
    raiz.onmousedown = function(e)
    {
      self.presionarTecla(raiz);
    };
    raiz.onmouseup = function(e)
    {
      self.soltarTecla(raiz);
    };
    punto.onmousedown = function(e)
    {
      self.presionarTecla(punto);
    };
    punto.onmouseup = function(e)
    {
      self.soltarTecla(punto);
    };
    igual.onmousedown = function(e)
    {
      self.presionarTecla(igual);
    };
    igual.onmouseup = function(e)
    {
      self.soltarTecla(igual);
    };
  }
}

Calculadora.init();