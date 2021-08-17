<template>
  <q-page class="lecture-page">
    <q-breadcrumbs>
      <q-breadcrumbs-el replace to="/" label="Schritt 1">
      </q-breadcrumbs-el>
      <q-breadcrumbs-el replace to="/step2" label="Schritt 2">
      </q-breadcrumbs-el>
      <q-breadcrumbs-el to="/step3" label="Schritt 3">
      </q-breadcrumbs-el>
    </q-breadcrumbs>
    <div>
      Klaus will in ein anderes Büro umziehen, weil er sich in die Sekretärin verliebt hat. Leider ist sie die Freundin vom Admin,
      er kann ihn also nicht um Hilfe bitten, den Switch für ihn umzukonfigurieren. Hilf Klaus!
    </div>
    <div class="row">
    <div class="col-6">
      <img class="pkt-img-part" src="../assets/Lovestory.png" />
    </div>
    <q-stepper v-model="step" vertical flat header-nav done-color="green" class="col-6"> 
      <q-step :name="0" title="01" :done="stepDone(0)" :header-nav="true">
        <div>
          Klaus zieht aus dem Einkauf ins Controlling. Er muss weiterhin im VLAN des Einkaufs bleiben, um auf Netzwerkgeräte zuzugreifen.
          Kann er seinen PC einfach an einen Switchport der neuen Abteilung anschließen und weiterhin in seinem VLAN bleiben?
        </div>
        <div class="row">
          <q-checkbox class="col-10" v-model="checkValues[1]" label="Ja" />
        </div>
        <div class="row">
          <div class="nope" v-if="checkValues[1]">
            Falsch. Die Ports der Abteilung sind statisch auf ihr VLAN eingestellt.
          </div>
        </div>
        <div class="row">
          <q-checkbox class="col-10" v-model="checkValues[2]" label="Nein" />
        </div>
        <div class="row">
          <div class="jo" v-if="checkValues[2]">
            Richtig. Die Ports der Abteilung sind statisch auf ihr VLAN eingestellt.
          </div>
        </div>
        <div class="row">
          <q-btn label="weiter" flat :disable="!stepDone(0)" @click="step += 1" />
        </div>
      </q-step>
      <q-step :name="1" title="02" :done="stepDone(1) && stepDone(2)" :header-nav="stepDone(0)">
        <div class="row">
          Es gibt eine Möglichkeit, den Switch zu konfigurieren, um die Zuordnung zu VLANs von den MAC-Adressen der CLients abhängig zu machen, anstatt von den Switchports.
        </div>
        <br>
        <div class="row">
          1. Was ist eine MAC-Adresse?
        </div>
        <div class="row">
          Die einzigartige Adresse eines bzw. einer...
        </div>
        <div class="row">
          <q-checkbox class="col-4" v-model="checkValues[3]" label="Mainboard" />
          <q-checkbox class="col-4" v-model="checkValues[4]" label="Netzwerkkarte" />
          <q-checkbox class="col-4" v-model="checkValues[5]" label="Soundkarte" />
          <q-checkbox class="col-4" v-model="checkValues[6]" label="Querflansch" />
          <q-checkbox class="col-4" v-model="checkValues[7]" label="Fluxkompensator" />
          <q-checkbox class="col-4" v-model="checkValues[8]" label="Nein" />
          <span v-if="checkValues[8]" class="col-4 nope"> Doch </span>
        </div>
        <div class="row jo" v-if="stepDone(1)">
          Richtig. Eine MAC-Adresse ist die einzigartige Kennung einer Netzwerkkarte.
        </div>
        <br>
        <div class="row">
          2. Wie nennt sich die oben beschriebene Art der Konfiguration?
        </div>
        <div class="row">
          <q-checkbox class="col-4" v-model="checkValues[9]" label="Statisch" />
          <q-checkbox class="col-4" v-model="checkValues[10]" label="Kompliziert" />
          <q-checkbox class="col-4" v-model="checkValues[11]" label="Dynamisch" />
          <q-checkbox class="col-4" v-model="checkValues[12]" label="Softwarebasiert" />
        </div>
        <div class="row jo" v-if="stepDone(2)">
          Richtig.
        </div>
        <div class="row">
          <q-btn label="zurück" flat @click="step -= 1" />
          <q-btn label="weiter" flat :disable="!stepDone(1) || !stepDone(2)" @click="step += 1" />
        </div>
      </q-step>

      <q-step :name="2" title="03" :done="stepDone(3)" :header-nav="stepDone(1) && stepDone(2)">
        <div class="row">
          Mithilfe dynamischer VLANs erkennt ein Switch bei Anschluss eines Clients automatisch, zu welchem VLAN dieser gehört.
          Dies geschieht...
        </div>
       
        <div class="row">
          <q-checkbox class="col-4" v-model="checkValues[13]" label="Softwarebasiert" />
          <q-checkbox class="col-4" v-model="checkValues[14]" label="Hardwarebasiert" />
        </div>
        <div class="row jo" v-if="checkValues[13] && !checkValues[14]">
          Richtig.
        </div>
        <br>
        <div class="row">
          Um die automatische Zuordnung vornehmen zu können, werden die MAC-Adressen der Clients in einer Datenbank abgelegt.
        </div>
        <div class="row">
          <q-checkbox class="col-4" v-model="checkValues[15]" label="Richtig" />
          <q-checkbox class="col-4" v-model="checkValues[16]" label="Falsch" />
        </div>
        <div class="row jo" v-if="checkValues[15] && !checkValues[16]">
          Richtig.
        </div>
        <div class="row nope" v-if="checkValues[16]">
          Falsch, das ist richtig.
        </div>
        <div class="row">
          <q-btn label="zurück" flat @click="step -= 1" />
          <q-btn label="weiter" flat :disable="!stepDone(3)" @click="step += 1" />
        </div>
      </q-step>

      <q-step :name="3" title="04" :done="stepDone(4)" :header-nav="stepDone(3)">
        <div class="row">
          Wären die VLANs dynamisch zugeordnet, könnte Klaus seinen Computer also an irgendeinen Port anschließen und wäre immer im VLAN seiner Abteilung.
          Hilf Klaus, die anderen Vorteile der dynamischen Zuordnung hervorzuheben, um dem Admin keine Vorwände zu lassen, die Einrichtung zu verweigern.
        </div>
        <div class="row">
          Vorteile der dynamischen Zuordnung sind:
        </div>
        <div class="row">
          <q-checkbox v-model="checkValues[17]" label="Netzwerksicherheit" />
        </div>
        <div class="row jo" v-if="checkValues[17]">
          Richtig. Geräte, die nicht in der Datenbank erfasst sind, können sich an keinem Port mit einem VLAN verbinden. Das erhöht die Sicherheit ggü. der statischen Zuordnung, wo ein Angreifer sich an einem aktiven Port einwählen könnte.
        </div>
        <div class="row">
          <q-checkbox class="col-4" v-model="checkValues[18]" label="Schnelle Einrichtung" />
        </div>
        <div class="row nope" v-if="checkValues[18]">
          Falsch. Die Einrichtung dauert länger, da bei der statischen Zuordnung nur die Ports konfiguriert, bei der dynamischen allerdings alle Clients initial erfasst werden müssen.
        </div>
        <div class="row">
          <q-checkbox class="col-4" v-model="checkValues[19]" label="Flexibilität" />
        </div>
        <div class="row jo" v-if="checkValues[19]">
          Richtig. So wie Klaus ist man nicht auf einen speziell konfigurierten Port angewiesen, sondern kann jeden beliebigen aktiven Port verwenden.
        </div>
        <div class="row">
          <q-checkbox class="col-4" v-model="checkValues[20]" label="Niedriger Stromverbrauch" />
        </div>
        <div class="row nope" v-if="checkValues[20]">
          Falsch. Auf den Stromverbrauch hat die dynamische Zuordnung keinen Einfluss.
        </div>
        <div class="row">
          <q-btn label="zurück" flat @click="step -= 1" />
          <q-btn label="weiter" flat :disable="!stepDone(4)" @click="step += 1" />
        </div>
      </q-step>

      <q-step :name="4" title="05" :done="stepDone(5)" :header-nav="stepDone(4)">
        <div class="row">
          Klaus hat beinahe alle Infos, um den Admin zur Einrichtung zu bewegen. Jetzt braucht er noch Wissen um die Nachteile der dynamischen Zuordnung, damit er diese Details in der Diskussion umschiffen kann.
        </div>
        <div class="row">
          Nachteile der dynamischen Zuordnung sind:
        </div>
        <div class="row">
          <q-checkbox v-model="checkValues[21]" label="Erhöhter Wartungsaufwand" />
        </div>
        <div class="row jo" v-if="checkValues[21]">
          Richtig. Neue Geräte müssen der Datenbank händisch hinzugefügt werden.
        </div>
        <div class="row">
          <q-checkbox class="col-4" v-model="checkValues[22]" label="Kompliziertere Nutzung für die Luser" />
        </div>
        <div class="row nope" v-if="checkValues[22]">
          Falsch. Die Luser, wie Klaus auch, brauchen sich keine Gedanken zu machen, sondern können ihre Clients einfach einstöpseln.
        </div>
        <div class="row">
          <q-checkbox class="col-4" v-model="checkValues[23]" label="Benötigt spezielle Hardware" />
        </div>
        <div class="row jo" v-if="checkValues[23]">
          Richtig. Der Switch (und seine Software) müssen in der Lage sein, die dynamische Zuordnung auszuführen.
        </div>
        <div class="row">
          <q-checkbox class="col-4" v-model="checkValues[24]" label="Höherer Stromverbrauch" />
        </div>
        <div class="row nope" v-if="checkValues[24]">
          Falsch. Auf den Stromverbrauch hat die dynamische Zuordnung keinen Einfluss.
        </div>
        <div class="row">
          <q-btn label="zurück" flat @click="step -= 1" />
          <q-btn label="weiter" flat :disable="!stepDone(5)" @click="step += 1" />
        </div>
      </q-step>

      <q-step :name="5" title="06" :header-nav="stepDone(5)">
        <div class="row">
          Geschafft! Klaus hat alle nötigen Informationen und stürzt sich in den Kampf. Schließe die Lektion ab, um herauszufinden, wie die Liebesgeschichte ausgegangen ist.
        </div>
        <div class="row">
          <q-btn label="zurück" flat @click="step -= 1" />
          <q-btn label="Lektion abschließen" flat :disable="!stepDone(5)" replace to="/vlanfin" />
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
  name: 'Step3',
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
      7: false,
      8: false,
      9: false,
      10: false,
      11: false,
      12: false,
      13: false,
      14: false,
      15: false,
      16: false,
      17: false,
      18: false,
      19: false,
      20: false,
      21: false,
      22: false,
      23: false,
      24: false
    })

    function stepDone(stepnum: number): boolean {
      switch(stepnum) {
        case 0: return !checkValues.value[1] && checkValues.value[2];
        case 1: return !checkValues.value[3] && checkValues.value[4] && !checkValues.value[5] && !checkValues.value[6] && !checkValues.value[7] && !checkValues.value[8] ;
        case 2: return !checkValues.value[9] && !checkValues.value[10] && checkValues.value[11] && !checkValues.value[12];
        case 3: return checkValues.value[13] && !checkValues.value[14] && checkValues.value[15] && !checkValues.value[16];
        case 4: return checkValues.value[17] && !checkValues.value[18] && checkValues.value[19] && !checkValues.value[20];
        case 5: return checkValues.value[21] && !checkValues.value[22] && checkValues.value[23] && !checkValues.value[24];
        default: return false;
      }
    }

    return { 
      checkValues,
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