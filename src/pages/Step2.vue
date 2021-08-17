<template>
  <q-page class="lecture-page">
    <q-breadcrumbs>
      <q-breadcrumbs-el replace to="/" label="Schritt 1">
      </q-breadcrumbs-el>
      <q-breadcrumbs-el to="/step2" label="Schritt 2">
      </q-breadcrumbs-el>
    </q-breadcrumbs>
    <div>
      Um die Hardware effizienter auszulasten, werden die einzelnen Abteilungsswitches durch einen Etagenswitch ersetzt.
      Dieser Switch ist an einem einzelnen Interface des Routers angeschlossen. Alle Clients der Etage sind direkt mit dem
      Switch verbunden.
    </div>
    <div class="row">
    <div class="col-6">
      <img class="pkt-img-part" src="../assets/pkt_01.png" />
    </div>
    <q-stepper v-model="step" vertical flat header-nav done-color="green" class="col-6"> 
      <q-step :name="0" title="01" :done="stepDone(0)" >
        <div>
          Die VLANs wurden statisch eingerichtet, d.h. die Zuordnung der Clients zu einem VLAN ist portbasiert.
        </div>
        <div class="row">
          <q-checkbox class="col-10" v-model="checkValues[1]" label="Wenn man an den Switch-Port, an den derzeit der PC EK3 angeschlossen ist, ein anderes Gerät anschließt, befindet dieses Gerät sich automatisch in VLAN 40." />
        </div>
        <div class="row">
          <div class="jo" v-if="checkValues[1]">
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
        <div class="row jo" v-if="stepDone(1)">
            Richtig. Der Access Mode wird verwendet, um einen Switchport genau einem VLAN zuzuordnen. Der gesamte Traffic dieses Ports wird dem gewählten VLAN, in diesem Fall 40, zugeordnet.
        </div>
        <div class="row">
          <q-btn label="zurück" flat @click="step -= 1" />
          <q-btn label="weiter" flat :disable="!stepDone(1)" @click="step += 1" />
        </div>
      </q-step>

      <q-step :name="2" title="03" :done="stepDone(2)" :header-nav="stepDone(1)">
        <span>
          Ein Port des Switches nutzt einen anderen Modus. Welcher Port und welcher Modus?
        </span>
        <div class="row">
          <q-checkbox class="col-4" v-model="checkValues[2]" label="Switch zu PC11" />
          <div class="col-8 nope" v-if="checkValues[2]">
            Falsch.
          </div>
        </div>
        <div class="row">
          <q-checkbox class="col-4" v-model="checkValues[3]" label="Switch zu Router" />
          <div class="col-8 jo" v-if="checkValues[3]">
            Richtig. Der Router bedient über sein Interface zum Switch alle VLANs und der Switch kann an diesem Port deshalb nicht im Access Mode betrieben werden.
            Sonst wäre nur Traffic eines einzelnen VLAN möglich.
          </div>
        </div>
        <div class="row">
          <q-select class="col-8" :options="selectOptions[1]" v-model="selectValues[3]" label="Mode" />
          <div class="col-4 nope" v-if="selectValues[3] != 'Bitte auswählen' && selectValues[3] != 'Trunk'">
            Falsch.
          </div>
          <div class="col-4 jo" v-if="selectValues[3] != 'Bitte auswählen' && selectValues[3] == 'Trunk'">
            Richtig. Der Trunk Mode wird verwendet, um Traffic für mehrere VLANs über einen Port zu leiten.
          </div>
        </div>
        <div class="row">
          <q-btn label="zurück" flat @click="step -= 1" />
          <q-btn label="weiter" flat :disable="!stepDone(1)" @click="step += 1" />
        </div>
      </q-step>
      <q-step :name="3" title="04" :done="stepDone(3)" :header-nav="stepDone(2)">
        <div>
          Der Router bedient über das an den Switch angeschlossene Interface alle VLANs und kennt Ihre jeweiligen Subnetze.
          Um das Subnetz "Controlling" erreichen zu können, wurde das Interface am Router folgendermaßen konfiguriert:
        </div>
        <div class="row">
          <div class="col-12">
            <span class="row">
              1. interface gigabitethernet0/1.20
            </span>
            <div class="row">
              <div class="row">
                <q-checkbox class="col-8" v-model="checkValues[4]" label="Das Interface existiert bereits und wird angesteuert." />
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
            <div class="row">
              <div class="row">
                <q-checkbox class="col-8" v-model="checkValues[6]" label="Das Interface wird dem VLAN 20 zugeordnet, indem auf den dot1q Header in Packets geachtet wird." />
                <div class="col-4 jo" v-if="checkValues[6]">
                  Richtig. Mithilfe des dot1q Headers, der an Trunk-Ports für die Zuordnung zu VLANs verwendet wird, identifiziert der Router an seinem Interface Subnetz und VLAN von Packets.
                </div>
              </div>
              <div class="row">
                <q-checkbox class="col-8" v-model="checkValues[7]" label="Das Interface wird dem Subnetzbereich zugeordnet, der auf .20 endet." />
                <div class="col-4 nope" v-if="checkValues[7]">
                  Falsch. Die Netzadresse wurde dem Interface bereits in Schritt 2 zugewiesen.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <q-btn label="zurück" flat @click="step -= 1" />
          <q-btn label="weiter" flat :disable="!stepDone(3)" @click="step += 1" />
        </div>
      </q-step>
      <q-step :name="4" title="05" :done="stepDone(4)" :header-nav="stepDone(3)">
        <div>
          Es wird ein Ping von EK3 an PC6 gesendet. Welchen Weg nimmt das ICMP-Packet auf Hin- und Rückweg?
        </div>
        <div class="row">
          <div class="row">
            <q-select class="col-4 select-ping" :options="selectOptions[3]" value="EK3" label="Start" readonly />
            <q-select :label-color="`${selectValues[4] != 'Bitte auswählen' && selectValues[4] != 'Switch' ? 'red' : (selectValues[4] == 'Switch' ? 'green' : '')}`" class="col-4 select-ping" :options="selectOptions[3]" v-model="selectValues[4]" label="2" />
            <q-select :label-color="`${selectValues[5] != 'Bitte auswählen' && selectValues[5] != 'Router' ? 'red' : (selectValues[5] == 'Router' ? 'green' : '')}`" class="col-4 select-ping" :options="selectOptions[3]" v-model="selectValues[5]" label="3" />
            <q-select :label-color="`${selectValues[6] != 'Bitte auswählen' && selectValues[6] != 'Switch' ? 'red' : (selectValues[6] == 'Switch' ? 'green' : '')}`" class="col-4 select-ping" :options="selectOptions[3]" v-model="selectValues[6]" label="4" />
            <q-select :label-color="`${selectValues[7] != 'Bitte auswählen' && selectValues[7] != 'PC6' ? 'red' : (selectValues[7] == 'PC6' ? 'green' : '')}`" class="col-4 select-ping" :options="selectOptions[3]" v-model="selectValues[7]" label="5" />
            <q-select :label-color="`${selectValues[8] != 'Bitte auswählen' && selectValues[8] != 'Switch' ? 'red' : (selectValues[8] == 'Switch' ? 'green' : '')}`" class="col-4 select-ping" :options="selectOptions[3]" v-model="selectValues[8]" label="6" />
            <q-select :label-color="`${selectValues[9] != 'Bitte auswählen' && selectValues[9] != 'Router' ? 'red' : (selectValues[9] == 'Router' ? 'green' : '')}`" class="col-4 select-ping" :options="selectOptions[3]" v-model="selectValues[9]" label="7" />
            <q-select :label-color="`${selectValues[10] != 'Bitte auswählen' && selectValues[10] != 'Switch' ? 'red' : (selectValues[10] == 'Switch' ? 'green' : '')}`" class="col-4 select-ping" :options="selectOptions[3]" v-model="selectValues[10]" label="8" />
            <q-select class="col-4 select-ping" :options="selectOptions[3]" value="EK3" label="Ende" readonly />
          </div>
          <div class="row jo" v-if="stepDone(4)">
            Richtig. Da der Ping von einem Subnetz ins andere geht, muss zwischen den Clients immer der Router angesteuert werden. Der Switch, dessen den Clients zugewandte Ports den Access Mode nutzen,
            kann Packets nicht von einem VLAN ins andere leiten. Der Router muss den Ping neu verpacken und dabei auch den richtigen dot1q Header hinzufügen.
          </div>
        </div>
        <div class="row">
          <q-btn label="zurück" flat @click="step -= 1" />
          <q-btn label="weiter" flat :disable="!stepDone(4)" replace to="/step3" />
        </div>
      </q-step>
    </q-stepper>
    </div>
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
      3: 'Bitte auswählen',
      4: 'Bitte auswählen',
      5: 'Bitte auswählen',
      6: 'Bitte auswählen',
      7: 'Bitte auswählen',
      8: 'Bitte auswählen',
      9: 'Bitte auswählen',
      10: 'Bitte auswählen',
      11: 'Bitte auswählen',
    })

    const selectOptions = ref({
      1: ['Bitte auswählen', 'Trunk', 'Access', 'Static'],
      2: ['Bitte auswählen', '1: default', '10: Verkauf', '20: Controlling', '30: Personalabteilung', '40: Einkauf', '1002: fddi-default', '1003: token-ring-default', '1004: fddinet-default', '1005: trnet-default'],
      3: ['Bitte auswählen', 'Switch', 'EK3', 'PC6', 'Router', 'DHCP-Server'],
    })

    function stepDone(stepnum: number): boolean {
      switch(stepnum) {
        case 0: return checkValues.value[1];
        case 1: return selectValues.value[1] === 'Access' && selectValues.value[2] === '40: Einkauf';
        case 2: return !checkValues.value[2] && checkValues.value[3] && selectValues.value[3] === 'Trunk';
        case 3: return !checkValues.value[4] && checkValues.value[5] && checkValues.value[6] && !checkValues.value[7];
        case 4: return selectValues.value[4] == 'Switch' && selectValues.value[5] == 'Router' && selectValues.value[6] == 'Switch' && selectValues.value[7] == 'PC6' && selectValues.value[8] == 'Switch' && selectValues.value[9] == 'Router' && selectValues.value[10] == 'Switch';
        default: return false;
      }
    }

    return { 
      checkValues,
      selectValues,
      selectOptions,
      step,
      stepDone
    };
  }
});
</script>

<style>
.select-ping {
  margin-left: 10px;
}
.lecture-page {
  padding-left: 5%;
  padding-top: 2%; 
  padding-bottom: 2%;
}
.pkt-img-part {
  width: 100%;
  /* height: 100%; */
}
.nope {
  color: red;
}
.jo {
  color: green;
}
</style>