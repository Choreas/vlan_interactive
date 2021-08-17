<template>
  <q-page class="lecture-page">
    <q-breadcrumbs>
      <q-breadcrumbs-el replace to="/" label="Schritt 1">
      </q-breadcrumbs-el>
      <q-breadcrumbs-el replace to="/step2" label="Schritt 2">
      </q-breadcrumbs-el>
      <q-breadcrumbs-el replace to="/step3" label="Schritt 3">
      </q-breadcrumbs-el>
      <q-breadcrumbs-el to="/vlanfin" label="Ende">
      </q-breadcrumbs-el>
    </q-breadcrumbs>
    <div class="row">
      <div class="col-6">
        <img class="pkt-img-part" src="../assets/Lovestory_fin.png" />
      </div>
      <div class="col-6" style="margin-top: 20%;">
        <span>Geschafft! Nimm das, Admin! Danke fürs Bearbeiten der interaktiven VLAN-Lektion. Hoffentlich hast du so viel gelernt wie Klaus *Herzchen*</span>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: "VlanFin",
  setup() {
    
  },
})
</script>

<style>

</style>