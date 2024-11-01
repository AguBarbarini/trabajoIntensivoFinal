<template>
    <form @submit.prevent="submit">
      <input type="text" v-model="localCliente.idcod" placeholder="Código del cliente" readonly>
      <input type="text" v-model="localCliente.param1" placeholder="Nombre del cliente" required>
      <input type="text" v-model="localCliente.param2" placeholder="Apellido del cliente" required>
      <button type="submit">{{ isEditing ? 'Actualizar cliente' : 'Guardar cliente' }}</button>
    </form>
</template>
<script>
/* eslint-disable */ 
  export default {
    props: {
      cliente: {
        type: Object,
        default: () => ({
          idcod: '',
          param1: '',
          param2: '',
        }),
      },
    },
    data() {
      return {
        localCliente: { ...this.cliente },
        isEditing: false,
      };
    },
    watch: {
        cliente(newCliente) {
            if (newCliente) {
            this.localCliente = { ...newCliente };
            this.isEditing = !!newCliente.idcod; // Se considera en edición si hay idcod
            } else {
            this.localCliente = { idcod: '', param1: '', param2: '' }; 
            this.isEditing = false;
            }
        },
    },
    methods: {
      submit() {
        console.log('Datos a enviar:', this.localCliente);
        if (this.isEditing) {
          this.$emit('editCliente', { ...this.localCliente });
        } else {
          this.$emit('addCliente', { ...this.localCliente });
        }
        this.resetForm();
      },
      resetForm() {
        this.localCliente = { idcod: '', param1: '', param2: '' }; // Restablecer campos
        this.isEditing = false; 
      },
    },
  };
</script>
<style>
form {
    max-width: 400px; /* Ancho máximo del formulario */
    margin: 20px auto; /* Centrar el formulario (superior e inferior) */
    padding: 20px; /* Espaciado interno */
    border: 1px solid #ccc; /* Borde del formulario */
    border-radius: 5px; /* Bordes redondeados */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Sombra sutil */
    background-color: #f9f9f9; /* Color de fondo */
    display: flex; /* Usar flexbox para centrar contenido */
    flex-direction: column; /* Organizar los hijos en una columna */
    align-items: center; /* Centrar horizontalmente */
}

input[type="text"] {
    width: 100%; /* Ancho completo */
    padding: 10px; /* Espaciado interno */
    margin: 10px 0; /* Espaciado entre campos */
    border: 1px solid #ccc; /* Borde de los campos */
    border-radius: 4px; /* Bordes redondeados */
    font-size: 16px; /* Tamaño de fuente */
}

input[type="text"]:focus {
    border-color: #007bff; /* Color del borde al enfocar */
    outline: none; /* Eliminar el borde de enfoque predeterminado */
}

button.edit-button,
button.delete-button {
  padding: 5px 10px; /* Espaciado interno reducido */
  background-color: #28a745; /* Color de fondo para editar */
  color: #fff; /* Color del texto */
  border: none; /* Sin borde */
  border-radius: 4px; /* Bordes redondeados */
  font-size: 14px; /* Tamaño de fuente más pequeño */
  cursor: pointer; /* Cambiar el cursor al pasar por encima */
  margin-right: 5px; /* Espaciado a la derecha */
}

button.edit-button:hover {
  background-color: #218838; /* Color del botón editar al pasar por encima */
}

button.delete-button {
  background-color: #dc3545; /* Color de fondo para eliminar */
}

button.delete-button:hover {
  background-color: #c82333; /* Color del botón eliminar al pasar por encima */
}
</style>