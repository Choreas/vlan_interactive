<template>
  <q-page class="lecture-page">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Schritt 1" />
    </q-breadcrumbs>
    <div>
      Klaus arbeitet in einer Firma mit vier Abteilungen. Jede Abteilung hat einen Switch, an den alle Clients angeschlossen sind.
      Jeder Switch ist über sein eigenes Interface mit dem Router verbunden. Jede Abteilung besitzt Ihr eigenes Subnetz.
      Auf dem Bild siehst du die Topologie des Netzwerks.
    </div>
    <div>
      <img class="pkt-img" src="../assets/pkt_start.png" />
    </div>
    <div>
      Welche der folgenden Nachteile hat das Setup, in dem jede Abteilung ihren eigenen Switch besitzt?
      <br>
      <div class="row">
        <q-checkbox class="col-4" v-model="checkValues[1]" label="Hoher Stromverbrauch" />
        <div class="col-8 jo" v-if="checkValues[1]">
          Richtig. Dadurch, dass die Switches mindestens teilweise nicht ausgelastet werden und darüber hinaus an eigene Interfaces des Routers
          angeschlossen sind, ist mit Stromverschwendung zu rechnen.
        </div>
      </div>
      <div class="row">
        <q-checkbox class="col-4" v-model="checkValues[2]" label="Hohe Hardwarekosten" />
        <div class="col-8 jo" v-if="checkValues[2]">
          Richtig. Viele der Switches könnte man sich sparen, wenn man sie effizienter auslasten würde.
        </div>
      </div>
       <div class="row">
        <q-checkbox class="col-4" v-model="checkValues[3]" label="Komplizierte Wartung" />
        <div class="col-8 nope" v-if="checkValues[3]">
          Nein. Einer der Vorteile dieses Setups ist gerade der simple Aufbau und damit sehr unkomplizierte Wartung.
        </div>
      </div>
      <div class="row">
        <q-checkbox class="col-4" v-model="checkValues[4]" label="Clients sind an Ihre Räumlichkeiten gebunden." />
        <div class="col-8 jo" v-if="checkValues[4]">
          Richtig. Clients müssen an den Switch Ihrer Abteilung angeschlossen werden und sind damit räumlich unflexibel.
        </div>
      </div>
    </div>
    <q-btn replace to="/step2" label="Weiter" flat :disable="!continueEnabled()" />
  </q-page>
</template>

<script lang="ts">
import ExampleComponent from 'components/CompositionComponent.vue';
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'PageIndex',
  components: { ExampleComponent },
  setup() {
    

    const checkValues = ref({
      1: false,
      2: false,
      3: false,
      4: false
    })
    function continueEnabled(): boolean {
      return checkValues.value[1] && checkValues.value[2] && checkValues.value[4] && !checkValues.value[3];
    }
    return { 
      checkValues,
      continueEnabled
    };
  }
});
</script>

<style>
.lecture-page {
  padding-left: 5%;
  padding-top: 2%; 
  padding-bottom: 2%;
}
.pkt-img {
  width: 80%;
  height: 60%;
}
.nope {
  color: red;
}
.jo {
  color: green;
}
</style>