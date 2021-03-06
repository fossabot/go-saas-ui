<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row class="justify-content-md-center">
                    <b-col lg="6">
                        <b-card :title="$saas.t('pages.password-reset.title')">
                            <b-form @submit="onSubmit">
                                <b-alert v-if="form.hasError() && form.getResponse()" variant="danger" dismissible :show="true">
                                    <template v-if="form.getResponse().getCode() >= 400 && form.getResponse().getCode() < 500">
                                        {{ $saas.t('pages.password-reset.form.errors.4x') }}
                                    </template>

                                    <template v-if="form.getResponse().getCode() >= 500">
                                        {{ $saas.t('pages.password-reset.form.errors.5x') }}
                                    </template>
                                </b-alert>

                                <b-alert v-if="form.getResponse() && form.getResponse().getCode() === 200" variant="success" dismissible :show="true">
                                    {{ $saas.t('pages.password-reset.form.errors.2x') }}
                                    -
                                    <b-link :to="{name: 'login'}">{{ $saas.t('pages.password-reset.login') }}</b-link>
                                </b-alert>

                                <b-form-group :label="$saas.t('pages.password.form.fields.password.label')" label-for="password">
                                    <b-form-input id="password" v-model="passwordReset.password" type="password" required :placeholder="$saas.t('pages.password.form.fields.password.placeholder')"></b-form-input>
                                    <b-form-invalid-feedback :state="validatePassword()">
                                        {{ $saas.t('pages.password.form.validations.password') }}
                                    </b-form-invalid-feedback>
                                </b-form-group>

                                <b-row>
                                    <b-col sm="6">
                                        <b-form-group :label="$saas.t('pages.password-reset.form.fields.newPassword.label')" label-for="newPassword">
                                            <b-form-input id="newPassword" v-model="passwordReset.newPassword" type="password" required :placeholder="$saas.t('pages.password-reset.form.fields.newPassword.placeholder')"></b-form-input>
                                            <b-form-invalid-feedback :state="validateNewPassword()">
                                                {{ $saas.t('pages.password-reset.form.validations.newPassword') }}
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </b-col>

                                    <b-col sm="6">
                                        <b-form-group :label="$saas.t('pages.password-reset.form.fields.newPasswordConfirmation.label')" label-for="newPasswordConfirmation">
                                            <b-form-input id="newPasswordConfirmation" v-model="passwordReset.newPasswordConfirmation" type="password" required :placeholder="$saas.t('pages.password-reset.form.fields.newPasswordConfirmation.placeholder')"></b-form-input>
                                            <b-form-invalid-feedback :state="validateNewPasswordConfirmation()">
                                                {{ $saas.t('pages.password-reset.form.validations.newPasswordConfirmation') }}
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </b-col>
                                </b-row>

                                <b-button type="submit" variant="primary" :disabled="form.isDisabled() || !validator.isValid()">
                                    <b-spinner small v-if="form.isDisabled()" class="mr-1"></b-spinner>
                                    {{ $saas.t('pages.password-reset.form.button') }}
                                </b-button>

                                <b-button variant="link" :to="{name: 'login'}" class="ml-1">
                                    {{ $saas.t('pages.password-reset.login') }}
                                </b-button>
                            </b-form>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </template>
    </master>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import PasswordResetModel from '../../structs/password-reset';
import Form from '../../packages/form/basic/form';
import Validator from '../../packages/validator/basic/validator';

@Component
export default class PasswordReset extends Vue {
  private passwordReset: PasswordResetModel = new PasswordResetModel();
  private form: Form = new Form();
  private validator: Validator = new Validator([
    this.validatePassword,
    this.validateNewPassword,
    this.validateNewPasswordConfirmation,
  ]);

  public validatePassword(): boolean | null {
    if (this.passwordReset.password === null) {
      return null;
    }

    return this.passwordReset.password.length >= 6;
  }

  public validateNewPassword(): boolean | null {
    if (this.passwordReset.newPassword === null) {
      return null;
    }

    return this.passwordReset.newPassword.length >= 6;
  }

  public validateNewPasswordConfirmation(): boolean | null {
    if (this.passwordReset.newPasswordConfirmation === null) {
      return null;
    }

    return this.passwordReset.newPasswordConfirmation.length >= 6
        && this.passwordReset.newPassword === this.passwordReset.newPasswordConfirmation;
  }

  onSubmit($event: Event): void {
    $event.preventDefault();

    this.form.setError(false);
    this.form.setDisabled(true);
    this.form.setResponse(null);

    this.$saas.getHttp().post('/api/password-reset', this.passwordReset).then((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data));
      this.form.setDisabled(false);
      this.passwordReset = new PasswordResetModel();

      this.$saas.getSecurity().login(this.form.getResponse()!);
    }).catch((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data.response));
      this.form.setError(true);
      this.form.setDisabled(false);
      this.passwordReset = new PasswordResetModel();
    });
  }
}
</script>
