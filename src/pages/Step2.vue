<template>
  <q-page class="lecture-page">
    <div>
      Um die Hardware effizienter auszulasten, werden die einzelnen Abteilungsswitches durch einen Etagenswitch ersetzt.
      Dieser Switch ist an einem einzelnen Interface des Routers angeschlossen. Alle Clients der Etage sind direkt mit dem
      Switch verbunden.
    </div>
    <div>
      <img class="pkt-img" src="../assets/pkt_01.png" />
    </div>
    <q-stepper v-model="step" vertical flat header-nav done-color="green"> 
      <q-step :name="0" title="01" :done="stepDone(0)" >
        <div>
          Die VLANs wurden statisch eingerichtet, d.h. die Zuordnung der Clients zu einem VLAN ist portbasiert.
        </div>
        <div class="row">
          <q-checkbox class="col-4" v-model="checkValues[1]" label="Wenn man an den Switch-Port, an den derzeit der PC EK3 angeschlossen ist, ein anderes Gerät anschließt, befindet dieses Gerät sich automatisch in VLAN 40." />
          <div class="col-8 jo" v-if="checkValues[1]">
            Richtig. Im statischen Setup erfolgt die Zuordnung portbasiert.
          </div>
        </div>
        <div class="row">
          <q-btn label="weiter" flat :disable="!stepDone(0)" @click="step += 1" />
        </div>
      </q-step>
      <q-step :name="1" title="02" :done="stepDone(1)" :header-nav="stepDone(0)">
        <div class="row">
          <span class="col-12">
            Stelle den Switch-Port ein, an den der Client EK3 angeschlossen ist.
          </span>
          <div class="col-4">
            <q-select :options="selectOptions[1]" v-model="selectValues[1]" label="Mode" />
          </div>
          <div class="col-4" style="margin-left: 5%;">
            <q-select :options="selectOptions[2]" v-model="selectValues[2]" label="VLAN" />
          </div>
        </div>
        <div class="row">
          <q-btn label="zurück" flat @click="step -= 1" />
          <q-btn label="weiter" flat :disable="!stepDone(1)" @click="step += 1" />
        </div>
      </q-step>

      <q-step :name="2" title="03" :done="stepDone(2)" :header-nav="stepDone(1)">
        <div class="row">
          <span class="col-12">
            Ein Port des Switches nutzt einen anderen Modus. Welcher Port und welcher Modus?
          </span>
          <div class="col-4">
            <div class="row">
              <q-checkbox class="col-4" v-model="checkValues[2]" label="Switch zu PC11" />
              <div class="col-8 nope" v-if="checkValues[2]">
                Falsch.
              </div>
            </div>
            <div class="row">
              <q-checkbox class="col-4" v-model="checkValues[3]" label="Switch zu Router" />
              <div class="col-8 jo" v-if="checkValues[3]">
                Richtig.
              </div>
            </div>
          </div>
          <div class="col-4" style="margin-left: 5%;">
            <div class="row">
              <q-select class="col-8" :options="selectOptions[1]" v-model="selectValues[3]" label="Mode" />
              <div class="col-4 nope" v-if="selectValues[3] != 'Bitte auswählen' && selectValues[3] != 'Trunk'">
                Falsch.
              </div>
              <div class="col-4 jo" v-if="selectValues[3] != 'Bitte auswählen' && selectValues[3] == 'Trunk'">
                Richtig. Der Trunk Mode wird verwendet, um Traffic für mehrere VLANs über einen Port zu leiten.
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <q-btn label="zurück" flat @click="step -= 1" />
          <q-btn label="weiter" flat :disable="!stepDone(1)" @click="step += 1" />
        </div>
      </q-step>
      <q-step :name="3" title="04" :done="stepDone(3)" :header-nav="true">
        <div>
          Der Router bedient über das an den Switch angeschlossene Interface alle VLANs und kennt Ihre jeweiligen Subnetze.
          Um das Subnetz "Controlling" erreichen zu können, wurde das Interface am Router folgendermaßen konfiguriert:
        </div>
        <div class="row">
          <div class="col-6">
            <span class="row">
              1. interface gigabitethernet0/1.20
            </span>
            <div class="row">
              <div class="row">
                <q-checkbox class="col-8" v-model="checkValues[4]" label="Das Interface existiert bereits und wird angesteurt." />
                <div class="col-4 nope" v-if="checkValues[4]">
                  Falsch.
                </div>
              </div>
              <div class="row">
                <q-checkbox class="col-8" v-model="checkValues[5]" label="Das Interface wird erschaffen, indem 0/1 in Subinterfaces zerteilt wird." />
                <div class="col-4 jo" v-if="checkValues[5]">
                  Richtig.
                </div>
              </div>
            </div>
            <span class="row">
              2. ip address 10.10.20.1 255.255.255.0
            </span>
            <span class="row">
              3. encapsulation dot1q 20
            </span>
          </div>
        </div>
      </q-step>
    </q-stepper>
    
    <br>
  </q-page>
</template>

<script lang="ts">
import ExampleComponent from 'components/CompositionComponent.vue';
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'Step2',
  components: { ExampleComponent },
  setup() {
    const step = ref(0);

    const checkValues = ref({
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false
    })

    const selectValues = ref({
      1: 'Bitte auswählen',
      2: 'Bitte auswählen',
      3: 'Bitte auswählen'
    })

    const selectOptions = ref({
      1: ['Bitte auswählen', 'Trunk', 'Access', 'Static'],
      2: ['Bitte auswählen', '1: default', '10: Verkauf', '20: Controlling', '30: Personalabteilung', '40: Einkauf', '1002: fddi-default', '1003: token-ring-default', '1004: fddinet-default', '1005: trnet-default']
    })

    function continueEnabled(): boolean {
      return checkValues.value[1] && checkValues.value[2] && checkValues.value[4] && !checkValues.value[3];
    }

    function stepDone(stepnum: number): boolean {
      switch(stepnum) {
        case 0: return checkValues.value[1];
        case 1: return selectValues.value[1] === 'Access' && selectValues.value[2] === '40: Einkauf';
        case 2: return !checkValues.value[2] && checkValues.value[3] && selectValues.value[3] === 'Trunk';
        default: return false;
      }
    }

    return { 
      checkValues,
      continueEnabled,
      selectValues,
      selectOptions,
      step,
      stepDone
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