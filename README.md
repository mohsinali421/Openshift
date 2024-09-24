# This is for Openshift

- Redhat Console Sandbox - [https://console.redhat.com/openshift/sandbox]

### links
- Labs - [https://developers.redhat.com/learn?source=sso]
- Dev Cluster - [https://console-openshift-console.apps.sandbox-m4.g2pi.p1.openshiftapps.com/add/ns/mohsinali421-dev]
- Youtube Video - [https://www.youtube.com/watch?v=vu5w74xfLcA&t=132s]

### Integration with Automatic Github Webhook Trigger

### Deployemnt oc commands
- oc rollout latest dc/simple-docker-app
- oc rollout history dc/simple-docker-app
- oc rollout describe dc simple-docker-app
- oc rollout undo dc/simple-docker-app

### get ip
- oc get pods -o wide