from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note
from rest_framework.response import Response

# cannot call route unless authenticated
# lists all the notes user created
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # if we wanted all notes can do: Note.objects.all()
        
        # filters by author field, shows all notes by this specific user
        return Note.objects.filter(author=user)


    # reference Django documentation to figure out what functions we have to override

    # we want to do custom configurations when creating new user
    # override create method
    
    # serializer is passed data 
    # get access to serializer data and check if it is valid
    def perform_create(self, serializer):
        # if valid, makes a new version of the note
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
    
# specifies note we want to delete, deletes for us if we are authenticated
class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
 
        
class CreateUserView(generics.CreateAPIView):
    # list of different objects when create new one, make sure don't create user that exists
    queryset = User.objects.all()
    # what kind of data we need for a new user
    serializer_class = UserSerializer
    # who can call this data, think registration
    permission_classes = [AllowAny]
    
class NoteView(generics.RetrieveAPIView):
    def get(self, request, id):
        try:
            note = Note.objects.get(id=id)
        except Note.DoesNotExist: 
            print("Note not found in database")
            
        serializer = NoteSerializer(note)
        return Response(serializer.data, status= status.HTTP_200_OK)

class NoteEdit(generics.UpdateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    
    # this makes sure only the information that user has access to can be accessed   
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
