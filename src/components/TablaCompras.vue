<template>
    <table>
      <thead>
        <tr>
          <th>Id compra |</th>
          <th>Nombre del producto |</th>
          <th>Cantidad total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="compra in compras" :key="compra.idcod">
          <td>{{ compra.idcod }}</td>
          <td>{{ compra.param1 }}</td>
          <td>{{ compra.param2 }}</td>
          <td>
            <button class="edit-button" @click="$emit('editCompra', compra)">Editar</button>
            <button class="delete-button" @click="$emit('deleteCompra', compra.idcod)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
</template>
<script>
/* eslint-disable */ 
  export default {
    props: {
      compras: {
        type: Array,
        required: true,
      },
    },
  };
</script>